
local result

NuiMessages = {
    ["EXIT"] =  function (data, cb)
        SetNuiFocus(false, false)

        if result then
            result:resolve(data.gameState)
            result = nil
        end
    end
}

function MessageHandler(data, cb)
    if NuiMessages[data.action] then NuiMessages[data.action](data, cb); end
end

local function StartMiniGame(gameName, playTime)
    if result then return end
    result = promise.new()

    SetNuiFocus(true, true)SendNUIMessage {
        action = 'OPEN',
        actionData = {
            gameName = gameName,
            playTime = playTime
        }
    }

    return Citizen.Await(result)
end
exports('startMiniGame', StartMiniGame)

RegisterNUICallback('catchNui', MessageHandler)

-- RegisterCommand("simon", function ()
--     SetNuiFocus(true, true)
--     SendNUIMessage {
--         action = 'OPEN',
--         actionData = {gameName = "SIMON_SAYS", playTime = 80}
--     }
    
-- end)

-- RegisterCommand("numbers", function ()
--     SetNuiFocus(true, true)
--     SendNUIMessage {
--         action = 'OPEN',
--         actionData = {gameName = "NUMBERS", playTime = 20}
--     }
-- end)
 
-- RegisterCommand("shufflenumbers", function ()
--     SetNuiFocus(true, true)
--     SendNUIMessage {
--         action = 'OPEN',
--         actionData = {gameName = "SHUFFLE_NUMBERS", playTime = 80}
--     }
    
-- end)
 