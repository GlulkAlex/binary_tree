//druG_N_Drop

'use strict';

var drugTarget;//=drag().drugTarget;
/*#***************************************************************************************************************************#*/				
			
function allowDrop(ev) {
	ev.preventDefault();//prevent the browser default handling of the data (default is open as link on drop)
}
/*#***************************************************************************************************************************#*/				

function drag(ev) {
	//ondragstart attribute calls a function, drag(event), that specifies what data to be dragged.
	
	if (typeof(ev)==='undefined')
	{
		/*return {
			drugTarget: function() {
				return null;
			}
		}*/
		return ;
	}
	else
	{
		//dataTransfer.setData() method sets 
		//the data type and 
		//the value of the dragged data
		
		//dataTransfer object is similar to the clipboardData object, but 
		//it can be used for customizing drag-and-drop operations. 
		
		//ev.dataTransfer.setData("Text", ev.target.id);//ev.currentTarget ==td 
		//ev.currentTarget.textContent //ev.target.innerText
		var evTargetData;
		if (typeof(ev.target.innerText)==='undefined')
		{
			if (typeof(ev.target.textContent)==='undefined')
			{
				if (typeof(ev.target.innerHTML)==='undefined')
				{
					evTargetData=null;
					/* console.log('evTargetData=null'); */
				}
				else
				{
					evTargetData=ev.target.innerHTML;
					/* console.log('evTargetData=innerHTML:'+evTargetData); */
				}
			}
			else
			{
				evTargetData=ev.target.textContent;
				/* console.log('evTargetData=textContent:'+evTargetData); */
			}
		}
		else
		{
			evTargetData=ev.target.innerText;
			/* console.log('evTargetData=.innerText:'+evTargetData); */
		}
		
		if (ev.dataTransfer.setData("text/plain", evTargetData))//innerHTML == "text/html"
		{
			console.log("Cannot add the data to 'event' with '.setData'");
		}
		else
		{
			/* console.log("The '.setData' operation was successful."); */
		}
		
		drugTarget=ev.target;
		
		/*return {
			drugTarget: function() {
				//drugTarget=ev.target;
				return ev.target;
			}
		}*/
	}

}
/*#***************************************************************************************************************************#*/				

function drop(ev) {
	'use strict';
	ev.preventDefault();//prevent the browser default handling of the data (default is open as link on drop)
	
	/* if (typeof(ev)==='undefined')
	{
		console.log('dropEvvent=undefined');
		return ;
	}
	else
	{ */
		if (typeof(ev.dataTransfer.getData("text/plain"))==='undefined') //for .innerText
		{
			/* console.log('getEventData=undefined'); */
			return ;
		}
		else
		{
			var data = ev.dataTransfer.getData("text/plain");
			/* console.log('getEventData="'+'text/plain'+'":'+data); */
		}
	
	//}
	
	
	//ev.target.appendChild(document.getElementById(data));
	var dropTarget=ev.target;
	/* console.log('dropTarget.innerHTML='+dropTarget.innerHTML); */
	drugTarget.innerHTML=dropTarget.innerHTML;
	
	dropTarget.innerHTML=data;
}
/*#***************************************************************************************************************************#*/							

//contenteditable='true'
//bind to DOM element
//for 'TD' in/within multiple 'TR' class='draggable' 
//document.getElementsByTagName()
//document.getElementsByClassName("draggable");
//document.querySelector('tr.draggable');
//document.querySelectorAll();
var allTR;
var draggableTR;
var draggableTD;//in tr
var i;

//if (document.getElementsByTagName('TR')){
if (document.querySelectorAll('tr.draggable td')){

	//allTR=document.getElementsByTagName('TR');
	
	//if (allTR.getElementsByClassName("draggable")){
	
		/* console.log('TD "draggable" collection found'); */
		draggableTD=document.querySelectorAll('tr.draggable td');
		//draggableTR=allTR.getElementsByClassName("draggable");
		
		//for (var i=0;i<draggableTR.length;i++){
		for (i=0;i<draggableTD.length;i++){
		
			//element.setAttribute(attributename,attributevalue)
			//draggableTR[i].setAttribute('contenteditable',true);
			draggableTD[i].setAttribute('contenteditable',true);
			
		}
		
	//}
	
}

//table id='outputHeapArray'
if (document.querySelectorAll('#outputHeapArray td')){

		/* console.log('TD collection found'); */
		draggableTD=document.querySelectorAll('#outputHeapArray td');
		
		for (i=0;i<draggableTD.length;i++){
		
			draggableTD[i].setAttribute('draggable',true);//No return value
			/* ondragstart="drag(event)"
			ondrop="drop(event)" 
			ondragover="allowDrop(event)" */
			draggableTD[i].setAttribute('ondragstart',"drag(event)");
			draggableTD[i].setAttribute('ondrop',"drop(event)");
			draggableTD[i].setAttribute('ondragover',"allowDrop(event)");
			
		}
		
	//}
	
}