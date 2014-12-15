output = {}
sid = 'TPME.XAGUSD'
n = 0

window.Resource.gameSeries.forEach (item, index)->
	$.getJSON "http://api.baidao.com/api/hq/mkdata.do?sid=#{sid}&quotationType=60&limit=#{item.limit}&tradedate=#{item.tradedate}", (data) =>
		output["#{item.tradedate},#{item.limit}"] = data
		console.log "已经加载到第#{++n}"