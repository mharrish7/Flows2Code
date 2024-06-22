import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Textarea } from '@mantine/core';
import { ActionIcon, rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const [text, setText] = useState(data.text);
  const {setNodes,getNodes} = useReactFlow();

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

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <div style={{position : "absolute", right : "0.2rem",cursor : "pointer",top : "0.2rem", zIndex : 10000, padding : "0.2rem", borderRadius : "10rem", width : 'fit-content', height : "fit-content"}}onClick={() => {setNodes(prevNodes=>prevNodes.filter(node=>node.id!=data.label))}}>
                <IconX style={{ width: rem(15), height: rem(15) }} />
        </div>
      <Textarea
        placeholder="Enter your prompt"
        label={data.label}
        autosize
        minRows={2}
        value={text}
        onChange={(e) => {HandleText(e.target.value);}}
      />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;