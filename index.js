
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
  }
  
  loadJSON(function(response) {
      jsonresponse = JSON.parse(response);
      UIController(jsonresponse);
  });

  function UIController(response){
    console.log(response);
    
    let sortResult = response.data.recentActivities.sort(function(a,b){
        return a.postDate-b.postDate;
    });

  let userFeedImage ='';
  let userFeedData = '';

  let comment = {
    Comment: "commented on the idea",
    Idea: "posted an idea",
    Reply: "replied to a coment on the idea"
  }

    let commentFeed = function(comments,item){
        return `
        <span class="user-feed__data-name-comment">${comment[item.nodeTypeString]}</span>
        </div>
        `
    }

    sortResult.forEach(item => {
       userFeedImage += `
       <div class="user-feed__single-user">
       <div class="user-feed__avatar">
        <img class="user-feed__image" src="resources/${item.authorAvatar}" alt="user avatar">
        </div>
        <div class="user-feed__data-name">
            <h5 class="user-feed__data-name-author">${item.author}</h5>`

        userFeedImage += commentFeed(comment, item);
        userFeedImage += `<div class="user-feed__data-question">
        <h5 class="user-feed__data-question-header">${item.title}</h5></div>
            <div class="user-feed__data-time">
                <h5 class="user-feed__data-time-header">${new Date(item.postDate).toLocaleString()}</h5>
            </div>
        </div>`;
    });
    userFeedImage += `</div>`
    document.querySelector('.user-feed').insertAdjacentHTML('beforeend',userFeedImage);
    // document.querySelector('.user-feed__data').insertAdjacentHTML('beforeend',userFeedData);
  }