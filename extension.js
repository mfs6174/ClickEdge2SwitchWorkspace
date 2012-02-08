// ClickEdge2SwitchWorkspace
// Modified from Desktop Scroller(Copyright (C) 2011-2012 Marcos Diaz <diazmencia@gmail.com>).
// Copyright (C) 2011-2012 Zhang Xijin(mfs6174) <mfs6174@gmail.com>.
// ClickEdge2SwitchWorkspace is libre software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation, either version 3 of the License, or newer.
//
// You should have received a copy of the GNU General Public License along with
// this file. If not, see <http://www.gnu.org/licenses/>.

const St = imports.gi.St
const Main = imports.ui.main
const Wsp = imports.ui.workspaceSwitcherPopup

// Main class for the extension.
function main(){
    this.enable = function(){
	var monitor = Main.layoutManager.primaryMonitor
	var width = 3
	var height = monitor.height - 60
	var x = monitor.width - width
	var y = 30
	this.actorright = new St.Button({style_class:'desktopscroller'})
	this.actorright.set_position(0,y)
	this.actorright.set_width(width)
	this.actorright.set_height(height)
	this.actorright.opacity = 0
	this.actorright.connect('clicked', this.hook.bind(this))
	Main.layoutManager.addChrome(this.actorright, {visibleInFullscreen:true})
	
	this.actorleft = new St.Button({style_class:'desktopscroller'})
	this.actorleft.set_position(x,y)
	this.actorleft.set_width(width)
	this.actorleft.set_height(height)
	this.actorleft.opacity = 0
	this.actorleft.connect('clicked', this.hook1.bind(this))
	Main.layoutManager.addChrome(this.actorleft, {visibleInFullscreen:true})
	this.configure_overlay()
	this.configure_wsp()
    }
    this.disable = function(){
	Main.layoutManager.removeChrome(this.actorright)
	this.actorright.destroy()
	Main.layoutManager.removeChrome(this.actorleft)
	this.actorleft.destroy()
	
	this.overview.disconnect(this.connid0)
	this.overview.disconnect(this.connid1)
    }
    this.hook = function(actor, button){
	if(button==1) 
	    this.switch_workspace(-1)
	else
	    this.switch_workspace(1)
    }
    this.hook1 = function(actor, button){
	if(button==1) 
	    this.switch_workspace(1)
	else
	    this.switch_workspace(-1)
    }
    this.switch_workspace = function(incremental){
	var index = global.screen.get_active_workspace_index()
	var num = global.screen.n_workspaces
	index += incremental
	index = ((index % num)+num)%num
	global.screen.get_workspace_by_index(index).activate(false)
	this.wsp.display(incremental, index)
    }
    this.configure_overlay = function(){
	this.overview = get_actor_by_name(global.overlay_group, 'overview')
	this.connid0 = this.overview.connect('show', this.hide.bind(this))
	this.connid1 = this.overview.connect('hide', this.show.bind(this))
    }
    this.configure_wsp = function(){
	this.wsp = new Wsp.WorkspaceSwitcherPopup()
	this.actorright.raise(this.wsp.actorright)
	this.actorleft.raise(this.wsp.actorleft)
    }
    this.show = function(){
	this.actorright.show()
	this.actorleft.show()
    }
    this.hide = function(){
	this.actorright.hide()
	this.actorleft.hide()
    }
}

// Gnome-shell extension API.
function init() {desktopscroller = new main()}
function enable() {desktopscroller.enable()}
function disable() {desktopscroller.disable()}

// Other utils.
function get_actor_by_name(actor, name){
    var children = actor.get_children()
    for(var i in children) if(children[i].name == name) return children[i]
}
