//a function to fetch the category data (button/link id) before posting them to database
function check_cat(cat){
    $.post('/',{'cat': cat});
  }