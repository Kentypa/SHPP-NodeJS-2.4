import React from "react";

export const Task: React.FC = () => {
  return (
    <div className="task" v-bind:class="{ taskCompleted: data.checked}">
      {/*        <div className="contentText">*/}
      {/*          <div>*/}
      {/*            <button onClick={()=>{"@click=\"$emit('task_done')\""}} class="task_done taskButton">*/}
      {/*            <span v-if="!data.checked" style="color: rgba(0,0,0,.28);"> ☐ </span>*/}
      {/*            <span v-else style="color: #27ae60"> ☑ </span>*/}
      {/*          </button>*/}
      {/*          <span class="task_content" v-if="!data.editable">*/}
      {/*                    {{index}}. {{data.text}}*/}
      {/*                </span>*/}
      {/*          <span v-else>*/}
      {/*                    {{index}}. <input @keyup.enter="$emit('save')" v-model="data.inputedit" autofocus class="edit-input"/>*/}
      {/*                </span>*/}
      {/*        </div>*/}
      {/*        <div class="button check" v-if="!data.editable">*/}
      {/*          <button onClick={()=>{"@click=\"$emit('task_edit')\""}} className="color: #eca81a;"> ✎️ </button>*/}
      {/*        <button onClick={()=>{`"@click="$emit('task_del')""`}} className="color: #cd1537;"> ✕ </button>*/}
      {/*</div>*/}
      {/*  <div v-else>*/}
      {/*    <button onClick={()=>{"@click=\"$emit('save')\""}}> 💾 </button>*/}
      {/*  <button onClick={()=>{"@click=\"$emit('disable')"}}> ✕ </button>*/}
      {/*</div>*/}
      {/*</div>*/}
    </div>
  );
};
