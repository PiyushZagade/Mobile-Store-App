function createResult(e,d){
    if(d){
        return createSuccessResult(d);
    }else{
        return createErrorResult(e);
    }
}

function createErrorResult(e){
    return {status:"error",e: e}
}
function createSuccessResult(d){
    return {status:"success", d: d}
}

module.exports={createErrorResult,createSuccessResult,createResult}