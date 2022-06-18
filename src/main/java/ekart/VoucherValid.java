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

import org.json.JSONObject;

import ekart.getResultset;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/VoucherValid")
public class VoucherValid extends HttpServlet {
	
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
			String name=request.getParameter("name");
			String q1="Select name from voucher where name in ('"+name+"');";
			ResultSet r1=st.executeQuery(q1);
			List<JSONObject> json=getResultset.getJsonResultset(r1);
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
