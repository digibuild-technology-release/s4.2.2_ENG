/* globals GBX, GBXU, VGC, VDOselViewSurfaces, VDOspnCount */
// jshint esversion: 6
// jshint loopfunc: true

export default class VDO {}


VDO.getMenuViewDocuments = function() {

	const source = `<a href=${ MNU.urlSourceCode + VDO.script.sourceCode } target=_blank >${ MNU.urlSourceCodeIcon } source code</a>`;

	const help = VGC.getHelpButton( "VDObutSum", VDO.script.helpFile, POP.footer, source);

	const htm =

	`<details id="VDOdet" ontoggle=VDO.setViewOptions(); >

		<summary>VDO Documents <span id="VDOspnCount" ></span> </summary>

		${ help }

		<p>
			View document history. Raw gbXML data only. Full parser created as and when needed.
		</p>

		<textarea id=VDOtxtDocuments style=height:15rem;resize:both;width:100% ></textarea>


	</details>`;

	return htm;

};


VDO.setViewOptions = function() {

	if ( VDOdet.open === false ) { return; }

	VDO.documentHistory = GBX.text.match( /<DocumentHistory(.*?)<\/DocumentHistory>/gi ) || [];

	VDOtxtDocuments.value = VDO.documentHistory[ 0 ].replace( /> /g, ">\n");

};
