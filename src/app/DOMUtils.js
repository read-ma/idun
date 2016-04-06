import React from 'react';

const walkTheDOM = (node, func) => {
  let childsContent = Array.from(node.childNodes).map( (childNode) => {
    if (childNode.nodeType == document.TEXT_NODE){
      return func(childNode.nodeValue);
    }
    else {
      return walkTheDOM(childNode, func);
    }
  });

  let attributes = {};

  Array.from(node.attributes).map(attr => {
    if (attr.name == 'class')
      attributes['className'] = attr.value;
    else
      attributes[attr.name] = attr.value;
  });

  if (node.nodeName.toLowerCase() === 'img') {
    return React.createElement(node.nodeName, attributes);
  } else {
    return React.createElement(node.nodeName, attributes, childsContent);
  }
};

export { walkTheDOM }
