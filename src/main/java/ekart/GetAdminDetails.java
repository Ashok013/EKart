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

import org.json.JSONObject;

import ekart.getResultset;
@WebServlet("/GetAdminDetails")
public class GetAdminDetails extends HttpServlet {
	static final String url="jdbc:mysql://localhost:3306/eshop";
	static final String uname="root";
	static final String pass="Ashok@669061";	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con=DriverManager.getConnection(url,uname,pass);
			Statement st=con.createStatement();
			response.setContentType("text/html");
		    PrintWriter out = response.getWriter();
		    String q="select u.user_id,u.username,u.firstname,u.lastname,u.role,u.mail,group_concat(p.phone) as phone from users u left join phone p on u.user_id=p.user_id group by user_id having u.role='admin';";
			ResultSet r=st.executeQuery(q);
			List<JSONObject> json1=getResultset.getJsonResultset(r);
			//System.out.print(json1);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(json1);
			out.close();
		}
		catch (Exception e)
		{
			System.out.println(e);
		}
	}

	

}
