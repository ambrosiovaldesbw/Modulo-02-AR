window.AFRAME?.registerComponent("robot-modular",{
  init() {
    const colors={shell:"#c6ea67",edge:"#303a36",steel:"#65776f",light:"#caff71",ice:"#80f6e7"};
    function piece(parent, tag, position, geometry, color, rotation, glow=false) {
      const el=document.createElement("a-"+tag);
      el.setAttribute("position",position);
      for (const [name,value] of Object.entries(geometry)) el.setAttribute(name,value);
      if (rotation) el.setAttribute("rotation",rotation);
      el.setAttribute("material",glow ? "shader:flat; color:"+color : "color:"+color+"; metalness:.24; roughness:.46");
      parent.append(el);
      return el;
    }
    const box=(parent,position,width,height,depth,color,glow=false)=>piece(parent,"box",position,{width,height,depth},color,undefined,glow);
    const sphere=(parent,position,radius,color,glow=false)=>piece(parent,"sphere",position,{radius,"segments-width":20,"segments-height":12},color,undefined,glow);
    const joint=(parent,position)=>{
      const el=document.createElement("a-entity");
      el.setAttribute("position",position);
      parent.append(el);
      return el;
    };
    const body=this.el;
    piece(body,"cylinder","0 -.016 0",{radius:.57,height:.032,"segments-radial":42},colors.edge);
    piece(body,"ring","0 .006 0",{"radius-inner":.49,"radius-outer":.52,"segments-theta":48},colors.light,"-90 0 0",true);
    box(body,"0 .89 0",.61,.59,.36,colors.shell);
    box(body,"0 .52 0",.47,.19,.33,colors.edge);
    box(body,"0 .91 .186",.43,.34,.055,colors.edge);
    box(body,"0 .93 .221",.25,.061,.011,colors.ice,true);
    for (const x of [-.105,0,.105]) box(body,x+" .81 .22",.065,.025,.01,colors.steel);
    box(body,"0 1.21 0",.14,.14,.15,colors.steel);

    const head=joint(body,"0 1.38 0");
    box(head,"0 .055 0",.52,.37,.36,colors.shell);
    box(head,"0 .057 .186",.43,.24,.055,colors.edge);
    for (const x of [-.124,.124]) sphere(head,x+" .083 .221",.038,colors.ice,true);
    box(head,"0 -.025 .218",.15,.018,.014,colors.steel);
    piece(head,"cylinder"," .16 .296 0",{radius:.018,height:.115},colors.steel);
    sphere(head,".16 .365 0",.040,colors.light,true);
    head.setAttribute("animation","property:rotation; from:-6 -22 0; to:8 24 0; dur:1950; loop:true; dir:alternate; easing:easeInOutSine");

    for (const side of [-1,1]) {
      box(body,side*.148+" .298 0",.15,.29,.17,colors.steel);
      box(body,side*.148+" .14 .036",.206,.11,.24,colors.edge);
      box(body,side*.148+" .136 .155",.128,.026,.011,colors.ice,true);
      const arm=joint(body,side*.35+" 1.04 0");
      sphere(arm,"0 0 0",.12,colors.edge);
      box(arm,side*.03+" -.20 0",.17,.32,.195,colors.shell);
      sphere(arm,side*.03+" -.39 0",.091,colors.steel);
      box(arm,side*.03+" -.46 0",.158,.13,.15,colors.edge);
      arm.setAttribute("animation","property:rotation; from:-32 0 "+side*14+"; to:30 0 "+side*35+
        "; dur:1150; delay:"+(side===1?0:420)+"; loop:true; dir:alternate; easing:easeInOutSine");
    }
  },
});
