$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/alltasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.allboard>div.allcontent>table>thead>tr')
            const $tbodyObj = $('div.allboard>div.allcontent>table>tbody')
            const $alltasklist = responseJSONObj.list
            
            $alltasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.id
                const r = element.regDate
                console.log(q)
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $idTdObj = $('<td>')
                $idTdObj.addClass('id')
                $idTdObj.append(q)                
                $copyTrObj.append($idTdObj)  

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