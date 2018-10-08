import Node = laya.display.Node;
import { dataManager } from "../session/dataManager";

export default class nodeHelper {

    public static getNodeByName(parent: Node, name: string) {
        if (parent == null) {
            return null;
        }

        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            if (child != null && child.name == name) {
                return child;
            } else {
                var ret = nodeHelper.getNodeByName(child, name);
                if (ret != null) {
                    return ret;
                }
            }
        }
        return null;
    }

    //desc : a/b/c; a/..b; ..a/..b
    public static getNodeByPath(parent: Node, path: string): Node {
        if (parent == null) {
            return null;
        }

        var currentName = path;
        var nextNodePath = "";
        var index = currentName.indexOf("/");
        if (index >= 0) {
            currentName = path.substr(0, index);
            nextNodePath = path.substr(index + 1);
        }

        var currentNode = null;
        if (currentName.indexOf("..") == 0) {
            currentNode = nodeHelper.getNodeByName(parent, currentName.substr(2));
        } else {
            currentNode = parent.getChildByName(currentName);
        }

        if (nextNodePath.length == 0) {
            return currentNode;
        }
        return nodeHelper.getNodeByPath(currentNode, nextNodePath);
    }

    public static setTextByName(parent: Node, name: string, text: string) {
        var node = <laya.ui.Label>nodeHelper.getNodeByName(parent, name);
        if (node != null) {
            node.text = text;
        }
    }

    public static setTextByPath(parent: Node, path: string, text: string) {
        var node = <laya.ui.Label>nodeHelper.getNodeByPath(parent, path);
        if (node != null) {
            node.text = text;
        }
    }

    public static setVisible(parent: Node, name: string, visible: boolean) {
        var sprite = <laya.display.Sprite>nodeHelper.getNodeByName(parent, name);
        if (sprite != null) {
            sprite.visible = visible;
        }
    }

    public static foreachNode(parent: Node, callback: (node: Node) => void) {
        if (parent == null) {
            return;
        }

        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            if (child.numChildren == 0) {
                if (callback != null) {
                    callback(child);
                }
            } else {
                nodeHelper.foreachNode(child, callback);
            }
        }
        if (callback != null) {
            callback(parent);
        }
    }

    public static removeAllChildrenHandlers(node: Node) {
        nodeHelper.foreachNode(node, function (node: Node) {
            nodeHelper.removeAllHandlers(node);
        }.bind(this));
    }

    public static removeAllHandlers(node: any) {
        dataManager.instance().removeAllDataHandler(node);
        Laya.timer.clearAll(node);
    }
}