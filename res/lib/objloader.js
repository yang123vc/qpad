
var LOADER=exports;

LOADER.m_loaders={};
LOADER.RegisterLoader=function(name,f){
	LOADER.m_loaders[name]=f;
}
LOADER.LoadObject=function(data_list,id,fname){
	//todo: should use extension instead? raw images...
	var sdata=data_list[id]
	var p_newline=sdata.indexOf("\n");
	var sformat=sdata.substr(0,p_newline)
	var parser=LOADER.m_loaders[sformat];
	if(!parser){
		print(sdata)
		throw new Error("invalid document format '@1'".replace("@1",sformat))
	}
	return parser(data_list,id,fname)
}

LOADER.LoadFile=function(fname){
	//todo: a general "load file" - extension based
	var data_list=UI.LoadZipDocument(fname)
	return LOADER.LoadObject(data_list,0,fname)
}
