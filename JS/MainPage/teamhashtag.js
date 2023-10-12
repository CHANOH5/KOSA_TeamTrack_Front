const backURL = 'http://127.0.0.1:8888/KOSA_TeamTrack_Back'
const frontURL = 'http://127.0.0.1:5500/HTML'
$(() => {

    function ajaxSearchHandler(cp, data){
        $.ajax({
            url: backURL+ '/teamhashtag',
            method: 'get',
            data: `currentPage=${cp}&${data}`,
            success: (responseJSONObj) => {
    
                const status = responseJSONObj.status
                const list = responseJSONObj.list
                const hashlist = responseJSONObj.hashlist
                
                //원본 product객체찾기
                const $originNewTeam = $('div.mainteam>div.teamlist').first()
                //$originProduct.parent().children().not($originProduct)
                $originNewTeam.siblings().remove() //productlist영역 초기화
                $originNewTeam.show()
                
                $(list).each((index, t) => {
                    //복제본 product객체생성
                    const $copyNewTeam = $originNewTeam.clone()
                    const teamName = t.teamName
                    const studyType = t.studyType
                    const onOffLine = t.onOffLine
                    const joinMember = t.joinMember 
                    const maxMember = t.maxMember 
                    const createDate = t.createDate
                    const startDate = t.startDate 
                    const endDate = t.endDate 
                    const teamNo = t.teamNo
                    const briefInfo = t.briefInfo
                    const viewCnt = t.viewCnt
                    const hashtags = [];
        
                    $(hashlist).each((index, h) => {
                        const hashtag = h.hashtagName
                        const teamNo2 = h.teamNo
                        if(teamNo2==teamNo){
                            hashtags.push(hashtag)
                        }
                    })
                    console.log(hashtags)
                    const hashtag1 = hashtags[0]
                    const hashtag2 = hashtags[1]
                    const hashtag3 = hashtags[2]
                    const hashtag4 = hashtags[3]
                    const hashtag5 = hashtags[4]
        
                    //$copyTopTeam.find("ul>li>img").attr('src', '../images/' + prodNo + '.jpg').attr("alt", prodName)
                    $copyNewTeam.find("ul>li>span.teamName").html(teamName)
                    $copyNewTeam.find("ul>li>span.studyType").html(studyType)
                    $copyNewTeam.find("ul>li>span.onOffLine").html(onOffLine)
                    $copyNewTeam.find("ul>li>span.joinMember").html(joinMember)
                    $copyNewTeam.find("ul>li>span.maxMember").html(maxMember)
                    $copyNewTeam.find("ul>li>span.createDate").html(createDate)
                    $copyNewTeam.find("ul>li>span.startDate").html(startDate)
                    $copyNewTeam.find("ul>li>span.endDate").html(endDate)
                    $copyNewTeam.find("ul>div>li>span.hashtag1").html(hashtag1)
                    $copyNewTeam.find("ul>div>li>span.hashtag2").html(hashtag2)
                    $copyNewTeam.find("ul>div>li>span.hashtag3").html(hashtag3)
                    $copyNewTeam.find("ul>div>li>span.hashtag4").html(hashtag4)
                    $copyNewTeam.find("ul>div>li>span.hashtag5").html(hashtag5)
                    $copyNewTeam.find("ul>li>span.briefInfo").html(briefInfo)
                    $copyNewTeam.find("ul>li>span.viewcnt").html(viewCnt)
                    console.log($copyNewTeam.find("ul>li>span.viewcnt").html(viewCnt))
                    //복제본객체를 .productlist객체의 자식으로 추가
                    $('div.mainteam').append($copyNewTeam)
                })
                $originNewTeam.hide()

             //페이지그룹
             const $divPageGroup = $('div.pagegroup')
             //페이지그룹영역 초기화
             $divPageGroup.empty() 

             const startPage = responseJSONObj.startPage //시작페이지
             const endPage = responseJSONObj.endPage //끝페이지

             if(startPage > 1){
                 let page = `[<span class="pg${startPage - 1}">PREV</span>]&nbsp;&nbsp;&nbsp;`
                 $divPageGroup.html($divPageGroup.html()+page)
             }
             
             for(let i=startPage; i<=endPage; i++){
                 let page = `[<span class="pg${i}">${i}</span>]&nbsp;&nbsp;&nbsp;`
                 $divPageGroup.html($divPageGroup.html()+page)
             }

             if(endPage != responseJSONObj.totalPage){
                 let page = `[<span class="pg${endPage + 1}">NEXT</span>]`
                 $divPageGroup.html($divPageGroup.html()+page)
             }



            },
            error: () => {
   
            }
        })
       
    }
    const param = new URL(location.href).searchParams.get("data")
    data = "data="+param.substring(1)
    //alert(param)
    //data = decodeURI(location.search).substr(9)
    ajaxSearchHandler(1, data)
    
    //ajaxSearchHandler(1, data)
    $('div.pagegroup').on('click', 'span', (e) => {
        //alert($(e.target).html() + ": " + $(e.target).attr('class') + "페이지가 클릭되었습니다")
        const pg = $(e.target).attr('class')
        const currentPage = pg.substr(2)
        ajaxSearchHandler(currentPage, data)
    })



    })




