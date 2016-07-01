var CoreDBGet = React.createClass({

errorHandler: function (transaction, error)
{
  alert('Oops. Error was '+error.message+' (Code '+error.code+')');
  var we_think_this_error_is_fatal = true;
  if (we_think_this_error_is_fatal) return true;
  return false;
},

successHandler: function () {
    alert("success!");
},

myTransactionErrorCallback: function (error)
{
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
},

myTransactionSuccessCallback: function ()
{
    alert("Transaction complete.");
},

GetData: function () {
var db;
try {
    if (!window.openDatabase) {
        alert('not supported');
    } else {
      //name for created database as stored on disk or library
      //TODO:Possibly require path and ask jay to do test data
        var shortName = 'test';
        //statement for variabled to hold correct database version
        var version = '1.0';
        //name for database to be used by browser that describes database to user
        var displayName = 'flagDB';
        var maxSize = 65536; // in bytes
        db = window.openDatabase(shortName, version, displayName, maxSize);
        //TODO: study update state
        //if statement doesnt work then use this for database version
        //var version = db.version;

        // You should have a database instance in db.
    }
} catch(e) {
    // Error handling code goes here.
    if (e == 2) {
        // Version number mismatch.
        alert("Invalid database version.");
    } else {
        alert("Unknown error "+e+".");
    }
}

alert("Database is: "+db);

var tableName = [];
var data = [];
var height = 0;
var colCount = false;
//create mainData object to hold DB info
var mainData;

db.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM Checks;', [],
    function(transaction, result) {

        if (result !== null && result.rows !== null) {
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
                if (height === 0)
                {
                  tableName[i] = result.rows.item(i);
                  console.log(tableName);

                }
                else if (height >= 1)
                {
                  data[i] = result.rows.item(i);
                  colCount = true;
                }

                alert(row.ID);
                if (colCount === true)
                {
                    mainData += tableName[i] + ": " + result.rows.item(i);
                    mainData += "\r\n" + "\n";
                }

            }

            height++;
        }

        //test to see if database worked
        console.log("Its working!!!");

        console.log(mainData);
        //return mainData js object so they can recieve DB data
        return (mainData);
    }, errorHandler);
}, myTransactionErrorCallback, myTransactionSuccessCallback
);
},

render: function() {
  var data = this.DataGet().toString();
  console.log(data);
  return (
    <div>
      {data}
    </div>
  );
}

});

ReactDOM.render(<CoreDBGet />, document.getElementById('app'));

//TODO: Ask about requiring and not
//TODO: Ask about es6 and es5
//TODO: Ask about GitHub or study it
