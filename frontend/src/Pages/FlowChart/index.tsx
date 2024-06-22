import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { useState } from 'react';
import { applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { TextUpdaterNode } from '@components';
import "./flow.css";

import { ActionIcon, rem } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
 
import 'reactflow/dist/style.css';
import { animate } from 'framer-motion';
import axios from 'axios';
 
const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '1', text : '' }, type : "textUpdater" }
];
const initialEdges = [];
const nodeTypes = { textUpdater: TextUpdaterNode };

const FlowChart = () => {
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

  const addNewNode = () => {
    const newNode = { id: String(Id), position: {x:100,y:100}, data : {label : String(Id), text : ''}, type : "textUpdater"};
    setNodes((nds) => [...nds, newNode]);
    setId(Id + 1);
  }

  const handleGen = async () => {
    const data = {
      edges: edges,
      nodes: nodes,
    };
  
    try {
      const response = await axios.post("/gen", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
      <button onClick={() => {handleGen();}} className={"gen-btn"}>Generate!</button>
    </div>
  );
}

export default FlowChart;