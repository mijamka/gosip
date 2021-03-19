// Client side scripts

//a function to fetch the category data (button/link id) before posting them to database
function check_cat(cat){
    $.post('/',{'cat': cat});
  }

//check the category of article before saving the button click in the database
  function check_cat_art(cat){
    if(cat == 'social_media'){
      cat='social media';
    }
    $.post('/articles',{'cat': cat});
  }
    

