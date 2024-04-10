/* globals THR, GBX, PIN, VCIOdet, VCIOselViewGroup, VCIOspnCount */
// jshint esversion: 6
// jshint loopfunc: true

export default class VGC {}



VGC.getHelpButton = ( id, file, footer, link  = "" ) => `<button id="${ id }" class="butHelp"
	onclick="POP.setPopupShowHide(${id},'${file}',POP.footer,'${ link }');" >
	? </button>`;



VGC.setSelectedIndex = function( input, select ) {

	const str = input.value.toLowerCase();

	const option = Array.from( select.options ).find( option => option.innerHTML.toLowerCase().includes( str ) );

	select.selectedIndex =  str && option ? option.index : -1;

	navDragMove.hidden = false;

};



VGC.setPopupBlank = function( intersected = null ) {

	PIN.intersected = intersected;

	THR.scene.remove( PIN.line, PIN.particle );

	divDragMoveContent.innerHTML = "";

	divDragMoveFooter.innerHTML = PFO.footer;

	navDragMove.hidden = false;

	THR.controls.enableKeys = false;

};



VGC.toggleViewSelectedOrAll = function( button, select, surfaces ) {
	//console.log( 'surfaces', surfaces );

	if ( select.selectedIndex === -1 ) { alert( "First, select a surface from the list"); return; }

	if ( button.classList.contains( 'active' ) && surfaces.length ) {

		GBXU.sendSurfacesToThreeJs( surfaces );

	} else {

		GBX.meshGroup.children.forEach( element => element.visible = true );

	}

	button.classList.toggle( "active" );

};



VGC.toggleViewSelectedMeshes = function( button, select, indexes ) {
	//console.log( 'surfaces', surfaces );

	if ( select.selectedIndex === -1 ) { alert( "First, select a surface from the list"); return; }

	if ( button.classList.contains( 'active' ) && indexes.length ) {

		GBX.meshGroup.children.forEach( mesh => mesh.visible = indexes.includes( mesh.userData.index ) ? true : false );

	} else {

		GBX.meshGroup.children.forEach( element => element.visible = true );

	}

	button.classList.toggle( "active" );

};