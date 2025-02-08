/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
//https://raw.githubusercontent.com/Tangerine0411/TestingStuff/refs/heads/main/onek0.js

import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { definePluginSettings } from "@api/Settings";



const settings = definePluginSettings({
    kitty_speed: {
        type: OptionType.NUMBER,
        description: "Kitty Speed",
        default: 102
    },
    kitty_distance: {
        type: OptionType.NUMBER,
        description: "Kitty distance from cursor",
        default: 48
    },
    kitty_type: {
        type: OptionType.SELECT,
        description: "Kitty?" ,
        options: [
            { label: "Oneko (classic)", value: "default", default: true },
            { label: "Ace", value: "ace" },
            { label: "Black", value: "black" },
            { label: "Bunny", value: "bunny" },
            { label: "Calico", value: "calico" },
            { label: "Eevee", value: "eevee" },
            { label: "Esmeralda", value: "esmeralda" },
            { label: "Fox", value: "fox" },
            { label: "Ghost", value: "ghost" },
            { label: "Gray", value: "gray" },
            { label: "Jess", value: "jess" },
            { label: "Kina", value: "kina" },
            { label: "Lucy", value: "lucy" },
            { label: "Maia", value: "maia" },
            { label: "Mike", value: "mike" },
            { label: "Silver", value: "silver" },
            { label: "Silversky", value: "silversky" },
            { label: "Snuupy", value: "snuupy" },
            { label: "Spirit", value: "spirit" },
            { label: "Tora", value: "tora" },
            { label: "Valentine", value: "valentine" },
            { label: "CUSTOM", value: "custom" }
        ] as const

    },
    kitty_CUSTOM: {
        type: OptionType.STRING,
        description: "CUSTOM KITTY, put raw image link below and select custom kitty.",
        default: ""
    }
});

export default definePlugin({
    name: "oneko",
    description: "cat follow mouse (real)",
    // Listing adryd here because this literally just evals her script
    //run eval fetch in loop, using a list of dictionaries, allowing for use of more cats, delete button gonna be interesting to implement
    authors: [Devs.Ven, Devs.adryd],settings,
    //gonna check for values, then run them through the fetch eval

    start() {

        let kitty_speed_replace = settings.store.kitty_speed ?? 10;




        let kitty_distance_replace = settings.store.kitty_distance ?? 48;

        
        let defaultGif : string = "https://raw.githubusercontent.com/coolesding/onekocord/";

        let kitty_type_replace: string = settings.store.kitty_type ?? "default";

        let completeGifLink :string = defaultGif+"main/skins/"+kitty_type_replace+".png"

        if (settings.store.kitty_type == "custom"){
            completeGifLink = settings.store.kitty_CUSTOM
        }

        fetch("https://raw.githubusercontent.com/Tangerine0411/TestingStuff/refs/heads/main/onek0.js")
            .then(x => x.text())
            .then(s => s.replace("const nekoSpeed = 10", "const nekoSpeed = "+kitty_speed_replace)
                .replace("distance < nekoSpeed || distance < 48", "distance < nekoSpeed || distance < "+kitty_distance_replace)
                .replace(defaultGif+"main/skins/ace.png",completeGifLink))
            .then(eval);
    },

    stop() {
        document.getElementById("oneko")?.remove();
    }
});
