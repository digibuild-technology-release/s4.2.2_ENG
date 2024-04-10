import React, { useState, useEffect, useRef } from 'react';

import IfcManager from '../IFC/IfcManager'

import * as THREE from "../IFC/three.min";
import FOB from "../IFC/fob-file-open-basic"
import THM from "../IFC/thm-theme"
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

import THR from "../IFC/thr-threejs-new";
import GBX from "../IFC/gbx-gbxml-parser-new";
import THRU from "../IFC/thru-three-utilities-new";
import FOO from "../IFC/foo-file-open-object-new";
import FOZ from "../IFC/foz-file-open-zip-new";
import FR from "../IFC/fr-file-reader-new";

import GBXMLFILE from "../BIM_KYT_ARK_OPT_IFC4_bst_gb.xml";

const VisualizationGBXML= () => {
  const [ifcFile, setIfcFile] = useState(GBXMLFILE);
  const divContentsNew = useRef(null);

  const init = () => {
    console.log('--> init')
    let target = divContentsNew.current;
    console.log('target', target)

    if (target != null) {
      THR.target = divContentsNew.current;

      THR.init();
      THR.animate();
      THR.addLights();
      THR.addGround();

      FOO.init();
    }
  };

  const setIFCFileText = async () => {
    try {
      const text = await fetch(GBXMLFILE).then(response => response.text());
      return text;
    } catch (error) {
      console.error('Error in setIFCFileText:', error);
    }
  };

  const drawModelGBXML = async () => {
    try {
      console.log('--> drawModelGBXML');
      THR.group = THR.setSceneNew(THR.group);
      THR.group.name = "GBXmeshGroup";

      THRU.setSceneNew(THRU.group);

      GBX.init();

      THR.updateScene(THR.group);

      let target = divContentsNew.current;
      THR.onWindowResize(target);
    } catch (error) {
      console.error('Error in drawModelGBXML:', error);
    }
  };

  useEffect(() => {
    init();
    setIFCFileText().then(text => {
      FOO.string = text;
      FOB.fileName = GBXMLFILE;
      FOB.fileOpenXml(text);
      drawModelGBXML();
    });
  }, []);

  return (
    <div className="App">
      <div style={{ marginTop: '5px', marginBottom: '5px', width: '600px', height: '600px', justifyContent:'center' }}>
        <div style={{ padding: '2px !important' }}>
          <div id="divContentsNew" ref={divContentsNew}></div>
          <div id="FOOdivLog"></div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationGBXML;
