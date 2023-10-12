const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/KOSA_Project2_Front/HTML'

function ajaxHandler(method, u, target) {
    console.log(u)
    
    if(method == 'GET'){
        target.load(u,  function( response, status, xhr ) {
            if ( status == "error" ) {
                alert(xhr.status + xhr.statusText)
            }
        })
    }
}

$(()=> {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/maintasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.board>div.content>table>thead>tr')
            $originTrObj.addClass('maintask')
            const $tbodyObj = $('div.board>div.content>table>tbody')
            
            responseJSONObj.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const r = element.enddate
                const no=element.taskNo
                $copyTrObj.data('taskNo', no);
                // console.log(q)

                const $nicknameTdObj = $('<td>')
                $nicknameTdObj.addClass('nickname')
                $nicknameTdObj.append(q)                
                $copyTrObj.append($nicknameTdObj)  

                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $enddateTdObj = $('<td>')
                $enddateTdObj.addClass('enddate')
                $enddateTdObj.append(r)
                $copyTrObj.append($enddateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })

    
    const $menus = $('div.taskboardmenu>ul>li>a')

    $menus.click((e) => {
        switch (e.target.className) {
            case 'maintask':
                location.href='./taskboard.html'
                break
            case 'alltask':
                localStorage.setItem("allcp", 1)
                location.href='./taskall.html?currentPage='+1
                break
            case 'completetask': 
                localStorage.setItem("completecp", 1)
                location.href='./taskcomplete.html?currentPage='+1
                break
            case 'mytask':
                localStorage.setItem("mycp", 1)
                location.href='./taskmy.html?currentPage='+1
                break
        }
        e.preventDefault()
    })

    const $createtaskmenu = $('section.taskboard>div.board>div.content>table>tbody td.createtd>div.createbox')
    $createtaskmenu.click(() =>{
        $.ajax({
            xhrFields: {
              withCredentials: true
          },
          url: `${backURL}/chktaskid`,
          method: 'get',
          success: (responseJSONObj) => {
            if(responseJSONObj.status==0) {
                Swal.fire({
                    icon: 'question',
                    text: responseJSONObj.msg
                  })
            } else if(responseJSONObj.status==1) {
              //alert('성공')
              localStorage.setItem("loginedId", responseJSONObj.loginedId)
              localStorage.setItem("taskNo", responseJSONObj.taskNo)
              location.href='./taskcreate.html'
            }
          }
          })
    })

    $('section.taskboard>div.board>div.content>table').on('click', 'tbody tr.maintask', function() {
        const taskNo = $(this).data('taskNo')
        localStorage.setItem("taskNo", taskNo)
        location.href='./taskexam.html?taskNo='+taskNo
    })
})