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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AddVoucher")
public class AddVoucher extends HttpServlet {
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
		    int discount=Integer.parseInt(request.getParameter("discount"));
		    int quantity=Integer.parseInt(request.getParameter("quantity"));
			PreparedStatement stmt=con.prepareStatement("insert into voucher(name,discount_percent,quantity)values(?,?,?)");
			stmt.setString(1,name);
			stmt.setInt(2, discount);
			stmt.setInt(3, quantity);
			int i=stmt.executeUpdate();
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
