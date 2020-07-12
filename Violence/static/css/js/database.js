function loadDB()
      {
      var connection = new applicationCache.py("ADODB.Connection");
      var connectionstring = "Data Source=.;Initial Catalog=EmpDetail;Persist Security Info=True;User ID=Postgres_12;Password=1379;Provider=SQLOLEDB";
      connection.Open(connectionstring);
      var rs = new applicationCache.py("ADODB.Recordset");
      rs.Open("select * from emp", connection);
      rs.MoveFirst();
      var span = document.createElement("span");
      span.style.color = "Blue";
      span.innerText = " ID "+" Category "+" Description";
      document.body.appendChild(span);
      while (!rs.eof)
      {
      var span = document.createElement("span");
      span.style.color = "green";
      span.innerText = "\n " + rs.fields(0) +" | "+ rs.fields(1) +" | "+ rs.fields(2);
      document.body.appendChild(span);
      rs.MoveNext();
      }
      rs.close();
      connection.close();
      }
      loadDB()