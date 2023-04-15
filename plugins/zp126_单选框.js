import React from "react"
import css from "../css/zp126_单选框.css"

function render(ref) {
    if (!ref.props.dbf) return <div>请配置表单字段</div>
    const value = ref.getForm(ref.props.dbf)
    return ref.options.map((o, i) => <span onClick={() => click(ref, o)} className="zp126item" key={o + i}>
        <span className={"zp126box" + (value === o ? " checked" : "")}><i/></span>
        <label>{ref.labels ? ref.labels[i] : ""}</label>
    </span>)
}

function init(ref) {
    const { exc, props, render } = ref
    if (props.style) {
        ref.container.classList.add(props.style)
        if (props.style === "zcells") setTimeout(() => Array.from(ref.container.children).forEach(a => a.classList.add("zcell")), 9)
    }
    const O = ref.options = exc('clone(o)', { o: props.options || ref.children })
    const L = ref.labels = exc('clone(o)', { o: props.labels || O })
    if (!Array.isArray(O) || !Array.isArray(L)) {
        ref.options = []
        ref.labels = []
        warn("options/labels必须是数组")
    }
    if (O.length !== L.length) warn("options/labels的长度必须一致")
}

function click(ref, o) {
    ref.setForm(ref.props.dbf, o)
    if (ref.props.change) ref.exc(ref.props.change, { ...ref.ctx, $x: o }, () => ref.exc("render()"))
}


$plugin({
    id: "zp126",
    props: [{
        prop: "dbf",
        type: "text",
        label: "表单字段"
    }, {
        prop: "options",
        type: "text",
        label: "options选项数组",
        ph: "用括弧包裹表达式，优先于子组件"
    }, {
        prop: "labels",
        type: "text",
        label: "labels标签数组",
        ph: "不填则同options"
    }, {
        prop: "style",
        type: "select",
        label: "样式",
        items: ["inline", "block", "zcells"]
    }, {
        prop: "change",
        type: "exp",
        label: "onChange表达式"
    }],
    render,
    init,
    css
})