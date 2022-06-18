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
@WebServlet("/AddAdmin")
public class AddAdmin extends HttpServlet {
	static final String url="jdbc:mysql://localhost:3306/eshop";
	static final String uname="root";
	static final String pass="Ashok@669061";
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con=DriverManager.getConnection(url,uname,pass);
			Statement st=con.createStatement();
			response.setContentType("text/html");
		    PrintWriter out = response.getWriter();
		    String fname=request.getParameter("fname");
		    String lname=request.getParameter("lname");
		    String mail=request.getParameter("mail");
			String name=request.getParameter("name");
			String password=request.getParameter("password");
			String phone1=request.getParameter("phone");
			String phone2=request.getParameter("phone2");
			PreparedStatement stmt=con.prepareStatement("insert into users(firstname,lastname,username,password,mail,role)values(?,?,?,?,?,?)");
			stmt.setString(1,fname);
			stmt.setString(2, lname);
			stmt.setString(3,name);
			stmt.setString(4, password);
			stmt.setString(5,mail);
			stmt.setString(6, "Admin");
			int i=stmt.executeUpdate();
			String q="select user_id from users where username='"+name+"'";
			ResultSet r=st.executeQuery(q);
			r.next();
			int cid=r.getInt(1);
			PreparedStatement stmt1=con.prepareStatement("insert into phone(user_id,phone)values(?,?)");
			if(phone2.equals("0"))
			{
				stmt1.setInt(1, cid);
				stmt1.setString(2, phone1);
				stmt1.executeUpdate();
			}
			else
			{
				stmt1.setInt(1, cid);
				stmt1.setString(2, phone1);
				stmt1.executeUpdate();
				stmt1.setInt(1, cid);
				stmt1.setString(2, phone2);
				stmt1.executeUpdate();
			}
			JSONObject json=new JSONObject();
			json.put("success", i);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(json);
			out.close();
		}
		catch (Exception e)
		{
			System.out.println(e);
		}
	}

}
