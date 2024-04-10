/* global POPdivPopup, navDragMove, POPdivHeader, divDragMoveContent, POPdivFooter, main, showdown */
/* jshint esversion: 6 */
/* jshint loopfunc: true */
import showdown from './showdown.min'

export default class POP {}


POP.footer =

    `<div id=POPdivFooter >
		<button onclick=POP.requestFile(POP.popup,divDragMoveContent); >🏠</button>&nbsp;
		<button onclick=POP.requestFile(POP.license,divDragMoveContent); >⚖️</button>&nbsp;
		<span id=POPspanInfo >v${ POP.version } ${ POP.date }</span>
	</div>`;


POP.popup = "popup.md";



POP.init = function() {

    main.addEventListener( 'click', POP.onClickClose, false );
    main.addEventListener( 'touchstart', POP.onClickClose, false );

    const panel = document.body.querySelectorAll( "#navPanel");

    if ( panel && panel.length ) {

        navPanel.addEventListener( 'click', POP.onClickClose, false );
        navPanel.addEventListener( 'touchstart', POP.onClickClose, false );

    }

    divDragMoveHeader.addEventListener( 'mousedown', DMV.onMouseDown, false );
    window.addEventListener( 'mouseup', DMV.onMouseUp, false );

    divDragMoveHeader.addEventListener( 'touchstart', DMV.onTouchStart, false );
    divDragMoveHeader.addEventListener( 'touchmove', DMV.onTouchMove, false );

};



POP.setPopupShowHide = function( id = butPopupClose, text = POP.popup, footer = POP.footer, info ) {
    //console.log( 'info', info );

    POP.popupId = id;

    POP.popupId.classList.toggle( "active" );

    if ( POP.popupId.classList.contains( 'active' ) ) {

        //if ( divDragMoveContent.innerHTML === "" ) { POP.init(); }

        if ( text && text.toLowerCase().endsWith( ".md" ) ) {

            //navDragMove.style.height = "60%";
            POP.requestFile( text, divDragMoveContent );

        } else if ( text ) {

            divDragMoveContent.innerHTML = text;
            //navDragMove.style.height = "60%";
            navDragMove.hidden = false;

        } else {

            divDragMoveContent.innerHTML = text;
            navDragMove.hidden = true;

        }

        divDragMoveFooter.innerHTML = footer;

        POPspanInfo.innerHTML = info ? info : `v${ POP.version } - ${ POP.date }`;


    } else {

        POP.onClickClose();

    }

};



POP.onClickClose = function() {

    navDragMove.hidden = true;
    POP.popupId.classList.remove( "active" );
    divDragMoveContent.innerHTML = "";

    main.removeEventListener( 'click', POP.onClickClose );
    main.removeEventListener( 'touchstart', POP.onClickClose );

    const panel = document.body.querySelectorAll( "#navPanel");

    if ( panel && panel.length ) {

        navPanel.removeEventListener( 'click', POP.onClickClose);
        navPanel.removeEventListener( 'touchstart', POP.onClickClose );

    }

};



POP.requestFile = function( url, target ) {
    //console.log( '', url, target  );

    const xhr = new XMLHttpRequest();
    xhr.open( 'GET', url, true );
    //xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
    //xhr.onprogress = ( xhr ) => console.log( 'loaded', xhr.loaded );
    xhr.onload = ( xhr ) => POP.callbackMarkdown( xhr.target.response, target );
    xhr.send( null );

};



POP.callbackMarkdown = function( markdown, target ) {
    //console.log( 'markdown', markdown, target );

    showdown.setFlavor('github');
    const converter = new showdown.Converter();
    const html = converter.makeHtml( markdown );

    target.innerHTML = html;
    //console.log( 'html', html );

    navDragMove.hidden = false; // wait until loaded before showing

};



//////////

const DMV = {

    draggableLeft: 0,
    draggableTop: 0,

    draggableStartX: 0,
    draggableStartY: 0

};



DMV.onMouseDown = function( event ) {

    DMV.draggableTop = event.clientY - navDragMove.offsetTop;
    DMV.draggableLeft = event.clientX - navDragMove.offsetLeft;

    window.addEventListener('mousemove', DMV.onMouseMove, true );

};



DMV.onMouseMove = function( event ){

    navDragMove.style.top = ( event.clientY - DMV.draggableTop ) + 'px';
    navDragMove.style.left = ( event.clientX - DMV.draggableLeft ) + 'px';

};



DMV.onMouseUp = function() {

    window.removeEventListener( 'mousemove', DMV.onMouseMove, true );

};



DMV.onTouchStart = function( event ){

    DMV.draggableLeft = navDragMove.offsetLeft;
    DMV.draggableStartX = event.changedTouches[ 0 ].clientX;
    DMV.draggableTop = navDragMove.offsetTop;
    DMV.draggableStartY = event.changedTouches[ 0 ].clientY;
    //console.log( 'draggableTop', draggableTop, draggableStartY );
    //event.preventDefault();

    //console.log ('Status: touchstart', 'ClientX: ' + DMV.draggableStartX + 'px' );

};



DMV.onTouchMove = function( event ){

    const distX = event.changedTouches[ 0 ].clientX - DMV.draggableStartX;
    let left = DMV.draggableLeft + distX > document.body.clientWidth - 100 ?
        document.body.clientWidth - 100 : DMV.draggableLeft + distX;
    left = DMV.draggableLeft + distX < 0 ? 0 : left;
    //console.log( 'left2', left  );

    navDragMove.style.left = left + 'px';

    const distY = event.changedTouches[ 0 ].clientY - DMV.draggableStartY;
    // top is a reserved word

    let ttop = DMV.draggableTop + distY > window.innerHeight - 100 ?
        window.innerHeight - 100 : DMV.draggableTop + distY;
    ttop = DMV.draggableTop + distY < 0 ? 0 : ttop;
    //console.log( 'ttop', ttop  );

    navDragMove.style.top = ttop + 'px';

    event.preventDefault();

};