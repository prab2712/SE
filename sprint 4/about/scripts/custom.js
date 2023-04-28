$(window).load(function () {
    var checkUSerSession = sessionStorage.getItem("UserId");
    if (checkUSerSession != "admin") {
        $('#toolbar').hide();
        $('#LoginBtn').show();
    } else {
        $('#LogoutBtn').show();
    }
});

var urlCountry;
function newCountry() {
    $('#dlg').dialog('open').dialog('center').dialog('setTitle', 'New Country');
    $('#fm').form('clear');
    urlCountry = './addCountry';
}
function editCountry() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $('#dlg').dialog('open').dialog('center').dialog('setTitle', 'Edit Country');
        $('#fm').form('load', row);
        urlCountry = './updateCountry';
    }
}
function saveCountry() {
    debugger;
    $('#fm').form('submit', {
        url: urlCountry,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            if (result == 'inserted' || result == 'updated') {
                $.messager.show({
                    title: 'Succeed',
                    msg: 'Operation Completed Successfully'
                });
                $('#dlg').dialog('close');
                $('#dg').datagrid('reload');
            } else {
                $.messager.show({
                    title: 'Error',
                    msg: result
                });
            }
        }
    });
}
function destroyCountry() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $.messager.confirm('Confirm', 'Are you sure you want to destroy this Country?', function (r) {
            if (r) {
                $.post('./deleteCountry/' + row.Code, function (result) {
                    if (result == 'deleted') {
                        $.messager.show({
                            title: 'Succeed',
                            msg: 'Operation Completed Successfully'
                        });
                        $('#dg').datagrid('reload');
                    } else {
                        $.messager.show({
                            title: 'Error',
                            msg: result
                        });
                    }
                });
            }
        });
    }
}

var urlCity;
function newCity() {
    $('#dlg').dialog('open').dialog('center').dialog('setTitle', 'New City');
    $('#fm').form('clear');
    urlCity = './addCity';
}
function editCity() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $('#dlg').dialog('open').dialog('center').dialog('setTitle', 'Edit City');
        $('#fm').form('load', row);
        urlCity = './updateCity';
    }
}
function saveCity() {
    debugger;
    $('#fm').form('submit', {
        url: urlCity,
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            if (result == 'inserted' || result == 'updated') {
                $.messager.show({
                    title: 'Succeed',
                    msg: 'Operation Completed Successfully'
                });
                $('#dlg').dialog('close');
                $('#dg').datagrid('reload');
            } else {
                $.messager.show({
                    title: 'Error',
                    msg: result
                });
            }
        }
    });
}
function destroyCity() {
    debugger;
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $.messager.confirm('Confirm', 'Are you sure you want to destroy this Country?', function (r) {
            if (r) {
                debugger;
                $.post('./deleteCity/' + row.ID, function (result) {
                    if (result == 'deleted') {
                        $.messager.show({
                            title: 'Succeed',
                            msg: 'Operation Completed Successfully'
                        });
                        $('#dg').datagrid('reload');
                    } else {
                        $.messager.show({
                            title: 'Error',
                            msg: result
                        });
                    }
                });
            }
        });
    }
}

function ShowLogInModal() {
    $('#login-dlg').dialog('open').dialog('center').dialog('setTitle', 'Log In');
    $('#login-fm').form('clear');
}

function LogIn() {
    debugger;
    $('#login-fm').form('submit', {
        url: './authenticate',
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (result) {
            if (result == 'true') {
                $('#login-dlg').dialog('close');
                sessionStorage.setItem("UserId", "admin");
                location.reload();
            } else {
                $.messager.show({
                    title: 'Authentication Error',
                    msg: 'In-Valid UserId or Password'
                });
            }
        }
    });
}

function LogOut() {
    sessionStorage.setItem("UserId", "NULL");
    location.reload();
}

function Filter(urlOrignal) {
    debugger;
    var urlFilter = urlOrignal + document.getElementById('txtFilter').value;
    $('#dg').datagrid({url:urlFilter});
    var checkUSerSession = sessionStorage.getItem("UserId");
    if (checkUSerSession != "admin") {
        $('#toolbar').hide();
        $('#LoginBtn').show();
    } else {
        $('#LogoutBtn').show();
    }
}