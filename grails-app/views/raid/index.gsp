<%@ page import="org.stevegood.sk.Raid" %>
<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main">
    <title>Browse Raids</title>
</head>

<body>

<skm:pageHeader class="col-lg-12">
    <h1>
        Browse Raids
        <sec:ifLoggedIn>
            <span class="pull-right">
                <g:link controller="raid" action="create" class="btn btn-primary">
                    <span class="glyphicon glyphicon-plus"></span>
                </g:link>
            </span>
        </sec:ifLoggedIn>
    </h1>
</skm:pageHeader>

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <g:render template="raidList"
                      model="${[raidInstanceList: raidInstanceList, raidInstanceCount: raidInstanceCount]}"/>
        </div>
    </div>
</div>

<div class="pagination">
    <g:paginate total="${raidInstanceCount ?: 0}"/>
</div>
</body>
</html>
