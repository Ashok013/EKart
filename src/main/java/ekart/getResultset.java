package ekart;

//package lazy;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.*;
import com.google.gson.*;
import org.json.*;

import org.json.JSONObject;
public class getResultset {
	public static List<JSONObject> getJsonResultset(ResultSet r)
	{
		try
		{
		int column_count=r.getMetaData().getColumnCount();
		List<JSONObject> s=new ArrayList<JSONObject>();
		List<String> column=new ArrayList<String>();
		for(int i=1;i<=column_count;i++)
		{
			column.add(r.getMetaData().getColumnName(i).toUpperCase());
		}
		while(r.next())
		{
			JSONObject x=new JSONObject();
			for(int i=1;i<=column_count;i++)
			{
			String key=column.get(i-1);
			String value=r.getString(i);
			if(value==null)
				x.put(key, "-");
			else
			x.put(key, value);
			}
			s.add(x);			
		}
		return s;
		}
		catch (Exception e)
		{
			System.out.println(e);
		}
		return null;
	}

}

