<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<form action="<%=basePath %>schoolProvider/importTeacher" enctype="multipart/form-data" method="post">
	<input type="file" id = "file" name = "file"/>
	<input type="input" id = "schoolId" name = "schoolId" value="1"/>
	<select id="type" name="type">
		<option value="headmaster">headmaster</option>
		<option value="teacher">teacher</option>
	</select>
	<input type="submit" value="上传"/>
</form>
</body>
</html>