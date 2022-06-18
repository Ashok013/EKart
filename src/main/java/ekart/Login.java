package ekart;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
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

@WebServlet("/Login")
public class Login extends HttpServlet {
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
			String name=request.getParameter("username");
			String password=request.getParameter("password");
			String q1="select user_id,username ,password ,role from users where username ='"+name+"';";
			ResultSet r1=st.executeQuery(q1);
			List<JSONObject> json=getResultset.getJsonResultset(r1);
			if(json.size()==1)
			{
				String p1=json.get(0).getString("PASSWORD");
				String role=json.get(0).getString("ROLE");
				int id=json.get(0).getInt("USER_ID");
				if(password.equals(p1))
				{
					HttpSession s=request.getSession(true);
					s.setMaxInactiveInterval(-1);
					s.setAttribute("name", name);
					s.setAttribute("Role", role);
					s.setAttribute("userid", id);
				}
			}
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
