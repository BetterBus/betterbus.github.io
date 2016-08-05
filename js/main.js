var apiurl = "https://crossorigin.me/https://www.metlink.org.nz/api/v1/";

$(document).ready(function(){

});

function updateRealtime(){
	var stopnum = $("#stop-number-input").val();
	$("#realtime-table").html('');
	$("#stop-number").html('Loading...');
	$("#realtime-box").show();
	$("#realtime-loading").show();
	$.getJSON(apiurl + "StopDepartures/" + stopnum, function(data) {
		console.log(data);
		$("#stop-number").html("Stop " + stopnum + " " + data.Stop.Name);
		for(var i = 0; i < data.Services.length; i++){
			var service = data.Services[i];
			console.log(service.ServiceID + " - " + service.DestinationStopName);
			$("#realtime-table").append("<tr><td>"+
				service.ServiceID+"</td><td>"+
				service.DestinationStopName+"</td><td>"+
				readableSeconds(service.DisplayDepartureSeconds)+
				isDue(service.DisplayDepartureSeconds)+"</td><td>"+
				status(service.DepartureStatus)+"</td></tr>");
			$("#realtime-loading").hide();
		}
	});
}

function status(status){
	if(status == "early"){
		return "<span class='label label-info'>Early</span>";
	}
	else if(status == "onTime"){
		return "<span class='label label-success'>On-Time</span>";
	}
	else if(status == "delayed"){
		return "<span class='label label-danger'>Delayed</span>";
	}
	else{
		return "";
	}
}

function isDue(seconds){
	if(seconds < 120){
		return " <span class='label label-success'>DUE</span>";
	}
	else{
		return "";
	}
}

function readableSeconds(seconds){
	if(seconds < 60){
		return seconds + "secs";
	}
	else{
		return Math.floor(seconds / 60)+"mins "+(seconds % 60)+"secs";
	}
}