// -- HELPER FUNCTIONS -- //



//Get the color for a node, lighten an orange based on level. Subtle.
function getColor(level) {
  var color = tinycolor("fcb587");
  return color.lighten(2*level).toString();
}

//Get the highlighted color for a node, lighten a blue based on level. Subtle.
function getBlueColor(level) {
  var color = tinycolor("87b5fc"); //Note this is orange with RGB reversed.
  return color.lighten(2*level).toString();
}

//Gray-out a node
function grayOut(page) {
  var node = nodes.get(page);
  node.color="#bdbdbd";
  node.gray=true;
  nodes.update(node);
}

//Color a node
function colorNode(node,color) {
  if (!node.gray) {
    node.color=color;
  } else {
    node.color="#bdbdbd"
  }
  nodes.update(node);
}

//Expand the node for a page
function expandNode(page) {
  var node = nodes.get(page) //The node that was clicked
  var level = node.level + 1 //Level for new nodes is one more than parent
  var subpages = getSubPages(page); //Call python Flask API for subpages

  if (!subpages) {
    grayOut(page);

  } else {

    var subnodes = [];
    var newedges = [];
    //Create node objects
    for (var i=0; i<subpages.length; i++) {
      var subpage = subpages[i];
      if (nodes.getIds().indexOf(subpage) == -1) { //Don't add if node exists
          subnodes.push({id:subpage, label:wordwrap(subpage,15), value:1,
                         level:level, color:getColor(level), parent:page}); //Add node
      }
      newedges.push({id:page+"-"+subpage, from: page, to: subpage}); //TODO expanding a node twice shouldn't repeat the connections
    }
    //Add the stuff to the nodes array
    nodes.add(subnodes);
    edges.add(newedges);
  }
}


//Get all the nodes tracing back to the start node.
function getTraceBackNodes(node) {
  var finished = false;
  var startnode = nodes.get(startpage);
  var path = [];
  while (! finished) { //Add parents of nodes until we reach the start
    path.push(node);
    if (node==startpage) { //Check if we've reached the end
      finished = true;
    }
    node = nodes.get(node).parent; //Keep exploring with the node above.
  }
  return path;
}


//Reset the color of all nodes
function resetNodeColor() {
  var ids = nodes.getIds()
  for (var i=0; i<ids.length; i++) {
    var node = nodes.get(ids[i]);
    var level = node.level;
    colorNode(node,getColor(level));
  }
}
