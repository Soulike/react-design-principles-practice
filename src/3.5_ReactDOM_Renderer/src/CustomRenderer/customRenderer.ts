import ReactReconciler, {HostConfig, OpaqueRoot} from 'react-reconciler';
import {DOMElement, ReactElement, ReactNode} from 'react';

const hostConfig = {
  getRootHostContext: () => {},
  getChildHostContext: () => {},
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  shouldSetTextContent: (_, props) => {},
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {},
  createTextInstance: (text) => {},
  finalizeInitialChildren: () => {},
  clearContainer: () => {},
  appendInitialChild: (parent, child) => {},
  appendChild(parent, child) { },
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {},
  prepareUpdate(domElement, oldProps, newProps) {},
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {},
  commitTextUpdate(textInstance, oldText, newText) {},
  removeChild(parentInstance, child) {}
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export const render = (reactElement: ReactNode, domElement: OpaqueRoot, callback?: () => void) => {
  if(!domElement._rootContainer) {
    domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
  }
  return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
}
