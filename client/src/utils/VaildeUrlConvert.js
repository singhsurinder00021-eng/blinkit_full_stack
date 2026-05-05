export const VaildeUrlConvert = (name)=>{
    const  url = name?.toString().replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")
    return url
}