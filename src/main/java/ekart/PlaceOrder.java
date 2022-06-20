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
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;  
@WebServlet("/PlaceOrder")
public class PlaceOrder extends HttpServlet {
	static final String url="jdbc:mysql://localhost:3306/eshop";
	static final String uname="root";
	static final String pass="Ashok@669061";
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
		   LocalDateTime now = LocalDateTime.now();  
		   System.out.println(dtf.format(now)); 
		   HttpSession s=request.getSession(true);
			int name=(int)s.getAttribute("userid");		
			try
			{
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection con=DriverManager.getConnection(url,uname,pass);
				Statement st=con.createStatement();
				PreparedStatement p=con.prepareStatement("insert into purchase(user_id,purchase_time) values(?,now())");
				p.setInt(1, name);
				p.executeUpdate();
//				p.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
				String q="select purchase_id from purchase where user_id = "+name+" order by purchase_id desc limit 1";
				ResultSet r=st.executeQuery(q);
				r.next();
				int pid=r.getInt(1);
				String q1="select item_id,quantity from cart where user_id = "+name+";";
				r=st.executeQuery(q1);
				while(r.next())
				{
					PreparedStatement p1=con.prepareStatement("insert into orders(purchase_id,item_id,quantity) values(?,?,?)");
					p1.setInt(1, pid);
					p1.setInt(2, r.getInt(1));
					p1.setInt(3, r.getInt(2));
					p1.executeUpdate();
				}
				String q2="delete from cart where user_id = "+name+";";
				st.executeUpdate(q2);
			JSONObject json=new JSONObject();
			json.put("Success", "true");
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
