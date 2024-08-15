import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Textarea } from '@mantine/core';
import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useAppSelector } from '../../hooks';
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const [text, setText] = useState(data.text);
  const {setNodes,getNodes,getEdges} = useReactFlow();

  const HandleText = (value) => {
    setText(value);
    let nodes = getNodes();
    for(let node of nodes){
        if(node.id == data.label){
            data.text = text;
        }
    }
    setNodes(nodes);
  }

  const SetOutput = (code) => {
    let nodes = getNodes();
    console.log(nodes);
    let label = data["label"];
    for( let node of nodes){
      if(node['data']['label'] == label){
        node['data']['outputs'] = code;
      }
    }
    setNodes(nodes);
  }

  const [disable,setDisable] = useState(false);
  const lang = useAppSelector((app) => app.lang.value);

  const handleGen = async () => {
    console.log(lang);
    const body = {
      edges: getEdges(),
      nodes: getNodes(),
      lang : lang,
      node : data,
    };
    SetOutput("Generating... \n");
    setDisable(true);
  
    try {
      const response = await axios.post("/gen", body);
      SetOutput(response.data.data);
    } catch (error) {
      console.error(error);
    }
    setDisable(false);
  };

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        {/* <div style={{position : "absolute", right : "0.2rem",cursor : "pointer",top : "0.2rem", zIndex : 10000, padding : "0.2rem", borderRadius : "10rem", width : 'fit-content', height : "fit-content"}}onClick={() => {setNodes(prevNodes=>prevNodes.filter(node=>node.id!=data.label))}}>
                <IconX style={{ width: rem(15), height: rem(15) }} />
        </div> */}
      <Textarea
        placeholder="Enter your prompt"
        label={data.label}
        autosize
        minRows={2}
        disabled={disable}
        value={text}
        onChange={(e) => {HandleText(e.target.value);}}
      />
      </div>
      <button onClick={() => {handleGen();}} className={"gen-btn"}>Generate!</button>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} className='flow-handle'/>
    </div>
  );
}

export default TextUpdaterNode;