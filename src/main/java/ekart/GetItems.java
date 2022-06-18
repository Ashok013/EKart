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
@WebServlet("/GetItems")
public class GetItems extends HttpServlet {
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
		    int rownum=Integer.parseInt(request.getParameter("rownum"));
			System.out.println(rownum);
			int offset=6;
			String cat=request.getParameter("category");
			String q="";
			ResultSet r = null;
			PreparedStatement stmt;
			HttpSession s=request.getSession();
			System.out.println(s.getAttribute("name"));
			System.out.println(cat);
			if(cat==null||cat.equals("All"))
			{
				System.out.println("Haii");
			q="select * from item where num>="+((rownum-1)*offset+1)+" and num<="+rownum*offset+";";
			r=st.executeQuery(q);}
			else
			{
			stmt=con.prepareStatement("select * from (select *,Row_number() over(order by item_id) as num from items where category = ?) s  having num>=? and num < ? ;");
			stmt.setInt(2, (rownum-1)*offset+1);
			stmt.setInt(3,rownum*offset);
			stmt.setString(1,cat);
			r=stmt.executeQuery();
			}
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
