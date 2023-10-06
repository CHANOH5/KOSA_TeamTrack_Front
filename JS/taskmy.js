$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/mytasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.myboard>div.mycontent>table>thead>tr')
            const $tbodyObj = $('div.myboard>div.mycontent>table>tbody')
            const $mytasklist = responseJSONObj.list
            
            $mytasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.avgReviewscore
                const r = element.regdate
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $avgreviewscoreTdObj = $('<td>')
                $avgreviewscoreTdObj.addClass('avg_reviewscore')
                $avgreviewscoreTdObj.append(q)                
                $copyTrObj.append($avgreviewscoreTdObj)

                const $regdateTdObj = $('<td>')
                $regdateTdObj.addClass('regdate')
                $regdateTdObj.append(r)
                $copyTrObj.append($regdateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })
})