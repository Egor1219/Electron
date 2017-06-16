      setInterval(Case,200);

       var d1=0;
       var pages_count=0
       var selector_count=0;
	   var selectorhits_count=0;
       $(document).ready(function() {

         //Swquelize test-------------------
         var Sequelize = require('sequelize');
         const sequelize = new Sequelize('database', 'username', 'password', {
              host: 'localhost',
              dialect: 'sqlite',

              pool: {
                max: 5,
                min: 0,
                idle: 10000
              },

              // SQLite only
              storage: path.resolve(__dirname,'hunchly.db')
            });

            sequelize
            .authenticate()
            .then(() => {
              console.log('Connection has been established successfully.');
            })
            .catch(err => {
              console.error('Unable to connect to the database:', err);
            });
            const Test = sequelize.define('Tests', {

                name: {
                  type: Sequelize.STRING
                },
                pass:{
                  type:Sequelize.STRING
                }
              });
            Test.findAll().then(cases => {
                console.log(cases)
              })



         /////----------------------------------------/////////

         console.log(process)
           var i = 1
                db.each("SELECT * FROM cases", function(row) {
                  console.log(row)
                  var id=row.case_id;

                  if(i==1){
                    d1=id;
                    $('#case_name').html(row.case_name);
                    $('#case_created_date').html(row.created_date);
                    $('.dropdown-toggle').html(row.case_name+'<b class="caret"></b>');
                    db.each("SELECT COUNT() as id FROM pages WHERE case_id="+id, function(row) {

                        $("#pages_viewed1").text(row.id);
                    });
                      db.each("SELECT COUNT(*) as id FROM pages WHERE case_id="+d1, function(row) {
                        pages_count=row.id;
                      });
                  }
                    $(".dropdown-menu").append("<li onclick='flags("+row.case_id+")'><a href='#'><strong>" + row.case_name + "</strong></a></li>");
                    i++;
                });


                console.log(i);
                selector_table_append();
                db.each("SELECT COUNT(*) as cnt FROM selectors WHERE case_id="+d1,function(row){
                  selector_count=row.cnt;
                });
				db.each("SELECT COUNT(*) as cnt FROM selector_hits ",function(row){
                  selectorhits_count=row.cnt;
                });
            });

      $("#checkbox0").click(function () {
        //if ( $(this).is(':checked') ) {
        if($("#checkbox0").length == $("#checkbox0:checked").length) {
         $('.case').attr('checked', this.checked);
       }
       else {
           $(".case").removeAttr("checked");
       }

      });

      // if all checkbox are selected, check the selectall checkbox
      // and viceversa
      $(".case").on('click', function(){

       if($(".case").length == $(".case:checked").length) {
         $("#checkbox0").attr("checked", "checked");
       } else {
         $("#checkbox0").removeAttr("checked");
       }

      });
      $('a.imgTip').tinyTips('light', '<img src="assets/img/img41.png" style="width:480px"/>');
      $('#imgTip1').tinyTips('light', '<img src="assets/img/Image21.png" style="width:480px"/>');
      $('#imgTip2').tinyTips('light', '<img src="assets/img/img41.png" style="width:480px"/>');
      $('a.imgTip3').tinyTips('light', '<img src="assets/img/Image21.png" style="width:480px"/>');
      $('#notes_gridview').click(function(){
       $(this).css('background-color','#d6d1d1')
       $('#notes_listview').css('background-color','white')
      })
      $('#notes_listview').click(function(){
       $(this).css('background-color','#d6d1d1')
       $('#notes_gridview').css('background-color','white')
      })
      $('#notes_gridview1').click(function(){
       $(this).css('background-color','#d6d1d1')
       $('#notes_listview1').css('background-color','white')
      })
      $('#notes_listview1').click(function(){
       $(this).css('background-color','#d6d1d1')
       $('#notes_gridview1').css('background-color','white')
      });

      function flags(id){
       d1=id;
      }


      function Case(){
          var count=0;


           bfr = fs.readFileSync(path.resolve(__dirname,'hunchly.db'))
           db = new sql.Database(bfr);
           //console.log("db=",db)
           db.each("SELECT COUNT(*) as id , page_id FROM pages WHERE case_id="+d1, function(row) {

             $("#pages_viewed1").text(row.id);

             pages_count=row.id;



           });
             db.each("SELECT COUNT(*) as cnt FROM selectors WHERE case_id="+d1,function(row){
               if(selector_count != row.cnt){
                 selector_table_append();
                 selector_count=row.cnt;
               }
             });
			 db.each("SELECT COUNT(*) as cnt FROM selector_hits",function(row){
               if(selectorhits_count != row.cnt){
                 selector_table_append();
                 selectorhits_count=row.cnt;
               }
             });
            db.each("SELECT page_id FROM pages WHERE case_id="+d1, function(row) {
              db.each("SELECT COUNT(*) as id FROM photos WHERE page_id="+row.page_id,function(e) {
                count += e.id
              });
               //console.log("page_id--->",row.page_id);
            });

            $("#photo_tagged1").text(count);

            db.each("SELECT * FROM cases WHERE case_id="+d1, function(row) {
             //
                 $('#case_name').html(row.case_name);
                 $('#case_created_date').html(row.created_date);
                 $('.dropdown-toggle').html(row.case_name+'<b class="caret"></b>');
             //

         });
         db.close();

      }
      function selector_table_append(){
        var selectorhits=0;
        $("#selector_table").html("");
        bfr = fs.readFileSync(path.resolve(__dirname,'hunchly.db'))
        db = new sql.Database(bfr);

        db.each("SELECT selector_id,selector FROM selectors WHERE case_id="+d1,function(row){
        //  console.log(row.selector_id);

          var tempselectorhits = 0;
          db.each("SELECT COUNT(*) as id FROM selector_hits WHERE selector_selector_id="+row.selector_id,function(e){
            selectorhits += e.id;
            tempselectorhits += e.id;
          });
          $("#selector_table").append(' <div class="selector_row"><span id="td1">'+row.selector+'</span><span id="td2">'+tempselectorhits+'</span><button type="button"  class="close1"  aria-hidden="true" onclick="delete_selector('+ row.selector_id + ',\'' +row.selector+'\')"><i class="fa fa-times" style="padding-right:28%" ></i></button></div>')
        });
        $("#selector_hits1").text(selectorhits);

        //db.close();
      }
      var realy_selector_id=0;
      function delete_selector(id,name){
      //console.log(name);
         realy_selector_id=id;
        $("#select_name_modal").html(name);
        $('#ModalEdit').modal('show');
      }

      function realy_selector_delete(){
        console.log(realy_selector_id);
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database(path.resolve(__dirname,'hunchly.db'));
        db.each("SELECT * FROM selectors ",function(a,e){
          console.log(e);
        });
        db.run("DELETE FROM selectors WHERE selector_id="+realy_selector_id);
        db.run("DELETE FROM selector_hits WHERE selector_selector_id="+realy_selector_id);
        db.each("SELECT * FROM selectors ",function(a,e){
          console.log(e);
        });
        $('#ModalEdit').modal('hide');
      }

      //Add Cases
      function addCase(){
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('hunchly.db');
        var caseid;
        var currentdate = new Date();
        var casename=$('#casefield').val();
        var datetime = currentdate.getFullYear()+"-"+ (currentdate.getMonth()+1)+"-"+currentdate.getDate()+" "+currentdate.getHours() + ":"+ currentdate.getMinutes();
        console.log(datetime);
        if ($('#casefield').val()=='') {
          alert('Please insert Case name !')
          return;
        }
          // db.prepared("INSERT INTO cases (case_name,created_date) VALUES (casename,datetime)")

          db.serialize(function() {
              var stamp=db.prepare("INSERT INTO cases (case_name,created_date) VALUES (?,?)");
              stamp.run(casename,datetime);

              db.each("SELECT * FROM cases ORDER BY case_id DESC LIMIT 1", function(err,row) {
                $(".dropdown-menu").append("<li onclick='flags("+row.case_id+")'><a href='#'><strong>" + row.case_name + "</strong></a></li>");

              });

              stamp.finalize();
                //$(".dropdown-menu").append("<li onclick='flags("+row.case_id+")'><a href='#'><strong>" + row.case_name + "</strong></a></li>");

            });


        db.close();
        $('#casefield').val('');
      }
