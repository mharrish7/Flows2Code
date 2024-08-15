import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { useState, useEffect } from 'react';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { TextUpdaterNode } from '@components';
import "./flow.css";
import { Avatar } from '@mantine/core';
import { ActionIcon, Button, Select, rem, Drawer} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Tour from 'reactour';
import 'reactflow/dist/style.css';
import { animate } from 'framer-motion';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { CopyBlock } from 'react-code-blocks';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setlang } from '../../Slices/LangSlice';


const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '1', text : '',outputs : "Yet to generate"}, type : "textUpdater" }
];
const initialEdges = [];
const nodeTypes = { textUpdater: TextUpdaterNode };

const FlowChart = () => {
  const dispatch = useAppDispatch()
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [Id, setId] = useState(2);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const lang = useAppSelector((app) => app.lang.value);

  const addNewNode = () => {
    const newNode = { id: String(Id), position: {x:100,y:100}, data : {label : String(Id), text : '',outputs : "Yet to generate"}, type : "textUpdater"};
    setNodes((nds) => [...nds, newNode]);
    setId(Id + 1);
  }

  const [output,SetOutput] = useState("");

  
  const traverse = [];
  for(let i = 1; i <= 20; i++){
    traverse.push(i);
  }
  const [opened, { open, close }] = useDisclosure(false);
  const [code,setCode] = useState("");
  const [avatar,setAvatar] = useState("");

  const getAvatar = async() => {
    let res = axios.get("/api/user/get")
    setAvatar((await res).data.picture);
  }
  const comment = {"python" : "#", "c++" : "//", "javascript" :  "//", "java" : "//"};
  const [lang2, setLang2] = useState('python');
  useEffect(() => {
    let codes = "";
    console.log(lang2);
    for(let node of nodes){
      codes += "\n"+ comment[lang2]  + "Code Block - " + node["data"]["label"] + "\n";
      codes += node.data.outputs;
    }
    setCode(codes);
  },[nodes]);

  useEffect(() => {
    getAvatar();
  },[])

  const steps = [
    {
      selector: '.plus-icon',
      content: 'Click this to add more blocks!',
    },
    {
      selector: '.lang-choose',
      content: "Choose your language!",
    },
    {
      selector: '.code-btn',
      content: 'See your current code snippets',
    },
    {
      selector: '.flow-handle',
      content: 'Drag handles to connect the blocks! \n This shares the context between the blocks.',
    },
    {
      selector: '.react-flow',
      content: 'Just regenerate the code block if it there is any error in the code! Click edge and backspace to delete it.'
    }
  ]

  const [tour,setTour] = useState(true);
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
            <Avatar src={avatar} alt="it's me" style={{position : 'absolute', right : '1rem', top : '1rem'}} />

              <div style={{position : "absolute", top : "5rem", right : "0.9rem", zIndex : 10}}>
              <Select
            label="Language"
            placeholder="Pick value"
            onChange={(e) => {dispatch(setlang(e)); setLang2(e);}}
            value={lang}
            data={['python', 'java', 'c++', 'javascript']}
            className='lang-choose'
          />
          <button className="code-btn" onClick={open}>See Code</button>
        </div>
        <div style={{position : "absolute", top : "5rem", left : "0.9rem", zIndex : 10000}} onClick={() => {addNewNode();}}>
        
            <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number" className='plus-icon'>
                <IconPlus style={{ width: rem(24), height: rem(24) }} />
            </ActionIcon>
                  
        </div>
        
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Tour
        steps={steps}
        isOpen={tour}
        onRequestClose={() => {setTour(false)}} />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
      <Drawer offset={8} radius="md" opened={opened} onClose={close} position={"right"} title="Generated Code">
      <CopyBlock
      text={code}
      language={lang}
      showLineNumbers={true}
    />
      </Drawer>
      
    </div>
  );
}

export default FlowChart;

