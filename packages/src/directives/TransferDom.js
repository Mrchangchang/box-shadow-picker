/*
 * @Author: Mr Chang
 * @Date: 2019-07-12 10:20:00
 * @LastEditors: Mr Chang
 * @Description: file content
 */
/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget (node) {
  if (node === void 0) {
    return document.body
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body
  } else if (typeof node === 'string' && node.indexOf('?') > 0) {
    node = node.split('?')[0]
  }

  if (node === 'body' || node === true) {
    return document.body
  }

  return node instanceof window.Node ? node : document.querySelector(node)
}

function getShouldUpdate (node) {
  // do not updated by default
  if (!node) {
    return false
  }
  if (typeof node === 'object') {
    try {
      if (node && node.autoUpdate && node.targetId) {
        return true
      }
    } catch (e) {
      return false
    }
  }
  return false
}

const directive = {
  inserted (el, { value }) {
    if(!value.autoUpdate) return
    el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
    const parentNode = el.parentNode
    var home = document.createComment('')
    var hasMovedOut = false

    if (value !== false) {
      parentNode.replaceChild(home, el) // moving out, el is no longer in the document
      getTarget(value.targetId).appendChild(el) // moving into new place
      hasMovedOut = true
    }
    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(value.targetId),
        hasMovedOut: hasMovedOut
      }
    }
  },
  componentUpdated (el, { value }) {
    const shouldUpdate = getShouldUpdate(value)
    if (!shouldUpdate) {
      return
    }
    // need to make sure children are done updating (vs. `update`)
    var ref$1 = el.__transferDomData
    // homes.get(el)
    var parentNode = ref$1.parentNode
    var home = ref$1.home
    var hasMovedOut = ref$1.hasMovedOut // recall where home is

    if (!hasMovedOut && value) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el)
      // append to target
      getTarget(value.targetId).appendChild(el)
      el.__transferDomData = Object.assign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value.targetId) })
    } else if (hasMovedOut && value === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home)
      el.__transferDomData = Object.assign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value.targetId) })
    } else if (value) {
      // already moved, going somewhere else
      getTarget(value.targetId).appendChild(el)
    }
  },
  unbind: function unbind (el) {
    el.className = el.className.replace('v-transfer-dom', '')
    if (el.__transferDomData && el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
    }
    el.__transferDomData = null
  }
}

export default directive
