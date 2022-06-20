package ekart;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import ekart.getResultset;
@WebServlet("/OrderDetails")
public class OrderDetails extends HttpServlet {
	static final String url="jdbc:mysql://localhost:3306/eshop";
	static final String uname="root";
	static final String pass="Ashok@669061";
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession s=request.getSession(true);
		int name=(int)s.getAttribute("userid");		
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con=DriverManager.getConnection(url,uname,pass);
			Statement st=con.createStatement();
			String q="select p.purchase_id,group_concat(i.name)as name,sum(i.price*o.quantity)as total,p.purchase_time from orders o join purchase p on (o.purchase_id=p.purchase_id and p.user_id="+name+") join items i on(o.item_id=i.item_id) group by p.purchase_id;";
			ResultSet r=st.executeQuery(q);
		List<JSONObject> json=getResultset.getJsonResultset(r);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.print(json);
		out.close();
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
	}


}
