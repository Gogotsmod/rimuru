"use strict";
const {
downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./db/function/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("./db/function/myfunc");
const fs = require ("fs");
const Jimp = require('jimp');
const { Brainly } = require("brainly-scraper-v2");
const brain = new Brainly("id"); 
const RA = require('ra-api')
const ReadText = require('text-from-image')
const { recognize } = require('./db/function/ocr')
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const setting = JSON.parse(fs.readFileSync('./admin/config.json')); 
const daftar = JSON.parse(fs.readFileSync('./db/function/daftar.json')); 
const antilink = JSON.parse(fs.readFileSync('./db/function/antilink.json')); 
const welcome = JSON.parse(fs.readFileSync('./db/function/welcome.json')); 
var tebakgambar = JSON.parse(fs.readFileSync('./db/function/tebakgambar.json')); 
const speed = require("performance-now");
const Exif = require("./db/function/exif")
const exif = new Exif()
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(nayla, nay, m, setting, store, welcome) => {
try {
let { ownerNumber, botName, donas, namaowner, kodeprem} = setting
let { allmenu } = require('./admin/help')

const { type, quotednay, mentioned, now, fromMe } = nay
if (nay.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(nay.message)
const from = nay.key.remoteJid
const chats = (type === 'conversation' && nay.message.conversation) ? nay.message.conversation : (type === 'imageMessage') && nay.message.imageMessage.caption ? nay.message.imageMessage.caption : (type === 'videoMessage') && nay.message.videoMessage.caption ? nay.message.videoMessage.caption : (type === 'extendedTextMessage') && nay.message.extendedTextMessage.text ? nay.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotednay.fromMe && nay.message.buttonsResponseMessage.selectedButtonId ? nay.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotednay.fromMe && nay.message.templateButtonReplyMessage.selectedId ? nay.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (nay.message.buttonsResponseMessage?.selectedButtonId || nay.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotednay.fromMe && nay.message.listResponseMessage.singleSelectReply.selectedRowId ? nay.message.listResponseMessage.singleSelectReply.selectedRowId : ""
const toJSON = j => JSON.stringify(j, null,'\t')
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = nay.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (nay.key.participant ? nay.key.participant : nay.participant) : nay.key.remoteJid
const isOwner = ownerNumber == sender ? true : false
const pushname = nay.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? nay.message.conversation : (type === 'extendedTextMessage') ? nay.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const command1 = body.slice(6).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const isAntilink = antilink.includes(from) ? true : false
const botNumber = nayla.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await nayla.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
 
const isUrl = (url) => {return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
function jsonformat(string) {return JSON.stringify(string, null, 2)}

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = nayla.sendMessage(from, { text: teks, mentions: mems })
return res } else { let res = nayla.sendMessage(from, { text: teks, mentions: mems }, { quoted: nay })
return res}}
 
const reply = (teks) => {nayla.sendMessage(from, { text: teks }, { quoted: {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})},message: {"extendedTextMessage": {"text": `Runtime : ${runtime(process.uptime())}` }}}  })}
const textImg = (teks) => {return nayla.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: nay })}
const sendMess = (hehe, teks) => {nayla.sendMessage(hehe, { text, teks })}
const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return nayla.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];	
 
(function(_0x3a060a,_0x143599){var _0x31fedf=_0x1d16,_0x57af15=_0x3a060a();while(!![]){try{var _0x3cf9de=-parseInt(_0x31fedf(0x231))/(-0xc40+-0xba5+0x17e6)*(-parseInt(_0x31fedf(0x1f6))/(-0x2c5+-0x67e+0x945))+-parseInt(_0x31fedf(0x22b))/(-0x15b3+-0x123f*0x1+0x27f5)+parseInt(_0x31fedf(0x1f7))/(0xe*-0x1a+-0x99e+0x1*0xb0e)+-parseInt(_0x31fedf(0x211))/(0x1d71+-0x25f*0x2+0x41d*-0x6)*(-parseInt(_0x31fedf(0x22a))/(0x2670+-0x24f1+-0x1d*0xd))+parseInt(_0x31fedf(0x1f3))/(0x2168+-0x740+-0x1a21)*(-parseInt(_0x31fedf(0x228))/(0x1*-0x218b+-0x2661+0x2*0x23fa))+parseInt(_0x31fedf(0x1fc))/(-0x26e+-0x616+0x88d)+-parseInt(_0x31fedf(0x219))/(0xcf3+0x21ca+-0x2eb3)*(parseInt(_0x31fedf(0x223))/(0x253a+-0x33*0x8f+-0x1*0x8b2));if(_0x3cf9de===_0x143599)break;else _0x57af15['push'](_0x57af15['shift']());}catch(_0x3509ed){_0x57af15['push'](_0x57af15['shift']());}}}(_0x1518,0xe3ca8+0x1*-0xe66b9+0x167*0x656));function _0x1d16(_0x219184,_0x50c81b){var _0x188df1=_0x1518();return _0x1d16=function(_0x631589,_0x9d85c5){_0x631589=_0x631589-(0x261+-0x60+-0x15);var _0x4b1147=_0x188df1[_0x631589];return _0x4b1147;},_0x1d16(_0x219184,_0x50c81b);}async function textOverlay(_0x434533,_0x158f26){var _0xa4049d=_0x1d16,_0x5ae087={'gzgWh':_0xa4049d(0x1ed),'YypHs':_0xa4049d(0x20d)+_0xa4049d(0x203)+_0xa4049d(0x218)+_0xa4049d(0x21a)+_0xa4049d(0x1f2)+_0xa4049d(0x1f4)+_0xa4049d(0x225)+_0xa4049d(0x1f9)+_0xa4049d(0x209)+_0xa4049d(0x1ec)+_0xa4049d(0x237)+_0xa4049d(0x1f5)+_0xa4049d(0x233)+_0xa4049d(0x205)+_0xa4049d(0x215)+_0xa4049d(0x221)+_0xa4049d(0x22c)+_0xa4049d(0x1f8)+_0xa4049d(0x214)+_0xa4049d(0x220)+_0xa4049d(0x236)+_0xa4049d(0x1fb)+_0xa4049d(0x227)+_0xa4049d(0x212)+_0xa4049d(0x21d)+_0xa4049d(0x23b)+_0xa4049d(0x23d)+_0xa4049d(0x23c),'cPqwZ':_0xa4049d(0x1fe)+_0xa4049d(0x208)+_0xa4049d(0x1fd)+'pg','LhMoi':_0xa4049d(0x1ff)+_0xa4049d(0x22f)};try{var _0x1f3179=await nayla[_0xa4049d(0x232)+_0xa4049d(0x206)](sender,_0x5ae087[_0xa4049d(0x1fa)]);}catch(_0x560920){var _0x1f3179=_0x5ae087[_0xa4049d(0x222)];}let _0x1e4fd4=await Jimp[_0xa4049d(0x1f1)](_0x1f3179);_0x1e4fd4=_0x1e4fd4[_0xa4049d(0x1ee)](-0x8*0x38d+-0x6*-0x2bb+0xce6,-0x234*0x11+-0x1577+0x56*0xb2);const _0x3293fd=await Jimp[_0xa4049d(0x1f1)](_0x5ae087[_0xa4049d(0x204)]);_0x1e4fd4=await _0x1e4fd4,_0x3293fd[_0xa4049d(0x229)](_0x1e4fd4,0xb1*0x3+0x11*-0x18e+0x230*0xc,-0x561+-0x1*-0x46d+0x1b5,{'mode':Jimp[_0xa4049d(0x22d)+_0xa4049d(0x20e)],'opacityDest':0x1,'opacitySource':0x1});const _0x8ba6c3=await Jimp[_0xa4049d(0x21b)](Jimp[_0xa4049d(0x21f)+_0xa4049d(0x217)]);_0x3293fd[_0xa4049d(0x201)](_0x8ba6c3,-0x14*-0x99+0x122d+-0x1d13,-0x1e0d+-0x10a8+0x2eff,_0x434533),await _0x3293fd[_0xa4049d(0x21c)](_0x5ae087[_0xa4049d(0x207)]),nayla[_0xa4049d(0x200)+'e'](from,{'image':{'url':_0x5ae087[_0xa4049d(0x207)]},'caption':_0x158f26});}async function textOverlaymenu(_0x5f2307,_0x152611){var _0x39ad3c=_0x1d16,_0x4ea065={'ickWZ':_0x39ad3c(0x1ed),'gMxSD':_0x39ad3c(0x20d)+_0x39ad3c(0x203)+_0x39ad3c(0x218)+_0x39ad3c(0x21a)+_0x39ad3c(0x1f2)+_0x39ad3c(0x1f4)+_0x39ad3c(0x225)+_0x39ad3c(0x1f9)+_0x39ad3c(0x209)+_0x39ad3c(0x1ec)+_0x39ad3c(0x237)+_0x39ad3c(0x1f5)+_0x39ad3c(0x233)+_0x39ad3c(0x205)+_0x39ad3c(0x215)+_0x39ad3c(0x221)+_0x39ad3c(0x22c)+_0x39ad3c(0x1f8)+_0x39ad3c(0x214)+_0x39ad3c(0x220)+_0x39ad3c(0x236)+_0x39ad3c(0x1fb)+_0x39ad3c(0x227)+_0x39ad3c(0x212)+_0x39ad3c(0x21d)+_0x39ad3c(0x23b)+_0x39ad3c(0x23d)+_0x39ad3c(0x23c),'LXMeP':_0x39ad3c(0x1fe)+_0x39ad3c(0x208)+_0x39ad3c(0x1fd)+'pg','BmgGS':_0x39ad3c(0x1ff)+_0x39ad3c(0x22f),'LWaJy':_0x39ad3c(0x20a)+_0x39ad3c(0x1f0)+_0x39ad3c(0x213),'JrfNs':_0x39ad3c(0x22e)+_0x39ad3c(0x23a)+_0x39ad3c(0x213),'aOFlj':_0x39ad3c(0x230)+_0x39ad3c(0x235)+_0x39ad3c(0x213),'SSCIB':_0x39ad3c(0x226)+_0x39ad3c(0x216)};try{var _0x452908=await nayla[_0x39ad3c(0x232)+_0x39ad3c(0x206)](sender,_0x4ea065[_0x39ad3c(0x239)]);}catch(_0x2a9ed7){var _0x452908=_0x4ea065[_0x39ad3c(0x238)];}let _0x2f3a9f=await Jimp[_0x39ad3c(0x1f1)](_0x452908);_0x2f3a9f=_0x2f3a9f[_0x39ad3c(0x1ee)](-0x1d95+0x2096+-0x221,0x4*0x476+-0x26c9+0x15d2);const _0x3e8f48=await Jimp[_0x39ad3c(0x1f1)](_0x4ea065[_0x39ad3c(0x20c)]);_0x2f3a9f=await _0x2f3a9f,_0x3e8f48[_0x39ad3c(0x229)](_0x2f3a9f,0xd21*-0x1+-0x1*0x1aaa+0x29b*0x10,0xd28*0x1+0x53a+-0x1*0x11a1,{'mode':Jimp[_0x39ad3c(0x22d)+_0x39ad3c(0x20e)],'opacityDest':0x1,'opacitySource':0x1});const _0xaf1564=await Jimp[_0x39ad3c(0x21b)](Jimp[_0x39ad3c(0x21f)+_0x39ad3c(0x217)]);_0x3e8f48[_0x39ad3c(0x201)](_0xaf1564,0x54a+-0x1e81+-0x1a45*-0x1,-0x1bf2+0x13*-0xab+-0x28ed*-0x1,_0x5f2307),await _0x3e8f48[_0x39ad3c(0x21c)](_0x4ea065[_0x39ad3c(0x234)]),nayla[_0x39ad3c(0x200)+'e'](from,{'image':{'url':_0x4ea065[_0x39ad3c(0x234)]},'caption':_0x152611,'mentions':[_0x4ea065[_0x39ad3c(0x1ef)],_0x4ea065[_0x39ad3c(0x20b)],_0x4ea065[_0x39ad3c(0x202)],_0x4ea065[_0x39ad3c(0x20f)],ownerNumber[_0x39ad3c(0x210)]('@')[0x209c*0x1+-0x2b6*0xd+0x2*0x151]+(_0x39ad3c(0x21e)+_0x39ad3c(0x224))]});}function _0x1518(){var _0x1e06b5=['@s.whatsap','FONT_SANS_','vyvs4TgtwX','mEdC9IUVpF','YypHs','9735qcwtEh','p.net','RNnf_kEJfw','0@s.whatsa','-E43ru2vgR','6384EwPDDR','composite','4071474VDbVjJ','159345apsIdc','RLg2vJ_o4m','BLEND_SOUR','6285785445','/satu.jpg','6283856085','394721PMpaqJ','profilePic','G77oZZkhHd','BmgGS','455@s.what','8AUE4HQpbO','3X-CUmrJre','gMxSD','ickWZ','412@s.what','/pp%20wa%2','.jpg','0kosong-10','jBeah-EDZO','image','resize','LWaJy','729@s.what','read','g/b/R29vZ2','6433JFLuiz','xl/AVvXsEg','AluiymqBAM','2xaRmwc','1219528yhXKui','ZA8FgFT1x1','PtiKiQ-fAm','gzgWh','5inaXjvEQp','7074531aoiTjx','jxbL/bot.j','https://i.','./db/image','sendMessag','print','aOFlj','ogger.goog','cPqwZ','pAHpOg0X8M','tureUrl','LhMoi','ibb.co/f1M','KMwbkgx5hj','6282347260','JrfNs','LXMeP','https://bl','CE_OVER','SSCIB','split','5udOoYy','7wkG2cZl6s','sapp.net','FuQx3H1571','RoCAEwcF92','pp.net','64_WHITE','leusercont','9110XmdBeV','ent.com/im','loadFont','writeAsync','_npqY/s736'];_0x1518=function(){return _0x1e06b5;};return _0x1518();}

async function addLogin(satu) { daftar.push(satu)
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}

async function sendMedia(satu, dua, tiga) {
if (satu == "image") { nayla.sendMessage(from, {image:{url:dua}, caption:tiga},{quoted:{key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})},message: {"extendedTextMessage": {"text": `Runtime : ${runtime(process.uptime())}` }}}})}
}

async function dataJson(satu, dua, tiga) {
Object.keys(daftar).forEach((i) => {

if (satu == "+claim") { 
if (daftar[i].id == dua) {daftar[i].claim += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-claim") { 
if (daftar[i].id == dua) {daftar[i].claim -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±claim") { 
if (daftar[i].id == dua) {daftar[i].claim = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+uang") { 
if (daftar[i].id == dua) {daftar[i].uang += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-uang") { 
if (daftar[i].id == dua) {daftar[i].uang -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+exp") { 
if (daftar[i].id == dua) {daftar[i].exp += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-exp") { 
if (daftar[i].id == dua) {daftar[i].exp -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+exp") { 
if (daftar[i].id == dua) {daftar[i].exp += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+level") { 
if (daftar[i].id == dua) {daftar[i].level += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-level") { 
if (daftar[i].id == dua) {daftar[i].level -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+energi") { 
if (daftar[i].id == dua) {daftar[i].energi += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-energi") { 
if (daftar[i].id == dua) {daftar[i].energi -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+medali") { 
if (daftar[i].id == dua) {daftar[i].medali += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-medali") { 
if (daftar[i].id == dua) {daftar[i].medali -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±karakter") { 
if (daftar[i].id == dua) {daftar[i].karakter = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±status") { 
if (daftar[i].id == dua) {daftar[i].status = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±emote") { 
if (daftar[i].id == dua) {daftar[i].emote = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

})}

if (tebakgambar.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
const jawaban = tebakgambar[sender.split('@')[0]]
if (budy.toLowerCase() == jawaban) {
reply("Jawaban Anda Benar!\nAnda mendapatkan $100 Uang & 5000 medali")
delete tebakgambar[sender.split('@')[0]]
fs.writeFileSync("./db/function/tebakgambar.json", JSON.stringify(tebakgambar))
dataJson("+medali", sender, 5000)
dataJson("+uang", sender, 100)
}}


const MyData = (satu, dua) => {
let position = false
Object.keys(daftar).forEach((i) => {
if (daftar[i].id === dua) {
position = i
}})
if (position !== false) {
if (satu == "id") { return daftar[position].id }
if (satu == "uang") { return daftar[position].uang }
if (satu == "exp") { return daftar[position].exp }
if (satu == "medali") { return daftar[position].medali }
if (satu == "karakter") { return daftar[position].karakter }
if (satu == "energi") { return daftar[position].energi }
if (satu == "claim") { return daftar[position].claim }
if (satu == "status") { return daftar[position].status }
if (satu == "emote") { return daftar[position].emote }
}}
const harga = (satu) => {
reply(`• *Uang kamu* : $${MyData("uang", sender)}
• *Harga item* : $${satu}
Maaf uang kamu kurang $${satu - MyData("uang", sender)} untuk membeli item ini`)
}
const harga2 = (satu) => {
reply(`• *Medali kamu* : $${MyData("medali", sender)}
• *Harga item* : $${satu}
Maaf medali kamu kurang $${satu - MyData("medali", sender)} untuk membeli item ini`)
}
const sendAudio = (satu) => {
nayla.sendMessage(from, {audio:{url:`./db/audio/audio${satu}.mp3`}, mimetype:"audio/mp4", ptt:true})
}
const reactionMessage = { react: { text: `${MyData("emote", sender)}`, key: nay.key}}
if (!isGroup && isCmd && !fromMe) { 
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(nay.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
 dataJson("+exp", sender, 92)
if (MyData("status", sender) == true) {nayla.sendMessage(from, reactionMessage)}
}
if (isGroup && isCmd && !fromMe) { 
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(nay.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
dataJson("+exp", sender, 92)
if (MyData("status", sender) == true) {nayla.sendMessage(from, reactionMessage)}} 

if (MyData("uang", sender) <= 1) { dataJson("±uang", sender, 10)}
(function(_0xaac211,_0x16169b){const _0x3be895=_0x3331,_0x181e2f=_0xaac211();while(!![]){try{const _0x227132=-parseInt(_0x3be895(0xd8))/(0x1603+0x12e5+-0x28e7)*(-parseInt(_0x3be895(0xd4))/(-0x546+0x3a*-0x2+0x5bc))+-parseInt(_0x3be895(0xd9))/(-0x1*0x1b3f+-0x2*-0x1297+-0x4*0x27b)*(-parseInt(_0x3be895(0xe1))/(-0x301+-0x23a2*-0x1+-0x209d))+parseInt(_0x3be895(0xe8))/(-0xc24+0xd*-0x1fd+0x2602)*(parseInt(_0x3be895(0xcd))/(-0x7*0x3ec+-0x24b+0x1dc5))+-parseInt(_0x3be895(0xda))/(0x14aa+-0x1*-0xcc4+-0x1*0x2167)*(parseInt(_0x3be895(0xdb))/(-0x7*-0x567+0x141a+-0x39e3))+-parseInt(_0x3be895(0xce))/(-0x1c61+-0x3e8*0xa+0x437a*0x1)*(parseInt(_0x3be895(0xe2))/(-0x17dc+0xe91+0x955))+parseInt(_0x3be895(0xe0))/(-0x170*-0x3+-0x15*0x6b+0x1*0x482)+parseInt(_0x3be895(0xd2))/(-0x1a39+0xc*0x2ad+-0x73*0xd);if(_0x227132===_0x16169b)break;else _0x181e2f['push'](_0x181e2f['shift']());}catch(_0x1e2e3c){_0x181e2f['push'](_0x181e2f['shift']());}}}(_0x3de8,0x2f910+0x2*-0x28d5d+0x10*0x7321));function _0x3331(_0x536da8,_0x24c6e1){const _0x540cbc=_0x3de8();return _0x3331=function(_0x341e41,_0x283adb){_0x341e41=_0x341e41-(0x1*-0x14cf+-0x116f+0x270b);let _0x30af34=_0x540cbc[_0x341e41];return _0x30af34;},_0x3331(_0x536da8,_0x24c6e1);}async function maker(_0x668074,_0x1f2c46,_0x4dc4e8,_0x1f77a4,_0x309385,_0x228196,_0x47a3c1){const _0x54485a=_0x3331,_0x537c6b={'mKCYa':_0x54485a(0xcf)+_0x54485a(0xdd)+'g','WJaOy':function(_0x7752d8,_0x121a9a,_0x42df9b,_0x4e52be){return _0x7752d8(_0x121a9a,_0x42df9b,_0x4e52be);},'tKaEB':_0x54485a(0xd7)};let _0x3c8ca8=await Jimp[_0x54485a(0xe9)](_0x47a3c1);_0x3c8ca8=_0x3c8ca8[_0x54485a(0xdf)](-0x166b+-0x65*0x3f+-0x9e*-0x4f,0x47*0x3b+-0xa27+-0x4ba);const _0x2eed76=await Jimp[_0x54485a(0xe9)](_0x54485a(0xcf)+'/'+_0x668074+_0x54485a(0xdc));_0x3c8ca8=await _0x3c8ca8,_0x2eed76[_0x54485a(0xe7)](_0x3c8ca8,_0x1f2c46,_0x4dc4e8,{'mode':Jimp[_0x54485a(0xe5)+_0x54485a(0xd1)],'opacityDest':0x1,'opacitySource':0x1});const _0x47b197=await Jimp[_0x54485a(0xd5)](Jimp[_0x54485a(0xde)+_0x54485a(0xe4)]);_0x2eed76[_0x54485a(0xd3)](_0x47b197,_0x309385,_0x228196,_0x1f77a4),await _0x2eed76[_0x54485a(0xd6)](_0x537c6b[_0x54485a(0xe3)]),_0x537c6b[_0x54485a(0xe6)](sendMedia,_0x537c6b[_0x54485a(0xd0)],_0x537c6b[_0x54485a(0xe3)],':3');}function _0x3de8(){const _0x1b6be6=['10TXPTIa','mKCYa','64_WHITE','BLEND_SOUR','WJaOy','composite','5SGdyZn','read','897978DJIMvs','5948091JkZGVR','./db/maker','tKaEB','CE_OVER','231000OZtSBQ','print','14BJJyWd','loadFont','writeAsync','image','67157myIJlS','16302eSnxky','7LqsRIz','404504Pnbafz','.jpg','/sukses.jp','FONT_SANS_','resize','1877326GsRWKj','172gderMl'];_0x3de8=function(){return _0x1b6be6;};return _0x3de8();}

switch(command) { 
case'donasi':
reply(donas)
break
case 'menu':
case 'help':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlaymenu(pushname, allmenu(prefix, MyData, sender, ownerNumber), `No : ${sender.split("@")[0]}`);
break
case 'daftar':
if (MyData("id", sender) == sender) return textOverlay(pushname, "Anda Sudah terdaftar sebelumnya", `No : ${sender.split("@")[0]}`);
textOverlay("SUKSES TERDAFTAR", "Sukses Terdaftar", `No : ${sender.split("@")[0]}`);
addLogin({id: sender, uang: 1000, exp:1, level:1, karakter:false, energi:100, medali:1000, claim:1, status:false, emote: "👑"})
break
case 'buykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const liskarakter = `[ *KARAKTER SHOP* ]

~> *WINDBOT*
 > *Harga* : $500
 > *Buy?* : ${prefix + command} windbot

~> *WATER*
 > *Harga* : $12000
 > *Buy?* : ${prefix + command} waterbot
 
~> *SOILBOT*
 > *Harga* : $25500
 > *Buy?* : ${prefix + command} soilbot
 
~> *LISTRIKBOT*
 > *Harga* : $49200
 > *Buy?* : ${prefix + command} listrikbot

~> *FIREBOT*
 > *Harga* : $65000
 > *Buy?* : ${prefix + command} firebot
 
=> *Note* : Sesudah membeli *Karakter* Maka karakter sebelum nya akan tergantikan(TerHapus)`
if (!q) return sendMedia("image","./db/image/karakter.jpg",liskarakter)
if (q == "windbot") { 
if (MyData("uang", sender) <= 500) return harga(500)
dataJson("-uang", sender, 500)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
}
if (q == "waterbot") { 
if (MyData("uang", sender) <= 12000) return harga(12000)
dataJson("-uang", sender, 12000)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "soilbot") {
if (MyData("uang", sender) <= 25500) return harga(25500) 
dataJson("-uang", sender, 25500)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "listrikbot") { 
if (MyData("uang", sender) <= 49200) return harga(49200)
dataJson("-uang", sender, 49200)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "firebot") { 
if (MyData("uang", sender) <= 65000) return harga(65000)
dataJson("-uang", sender, 65000)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
dataJson("+exp", sender, 133)
break
case 'theworld':
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
if (MyData("energi", sender) <= 20) return reply("Energi kamu di bahwa 20, Ayo isi energi terlebih dahulu di #buyenergi")
const buttons = [{buttonId: `${prefix + command} 1`, buttonText: {displayText: 'GO!!!!'}, type: 1}]
const buttonMessage = { image: {url: 'https://t-2.tstatic.net/tribunkaltimwiki/foto/bank/images/peta-indonesia.jpg'}, caption: "[ *THE WORLD* ]", footer: 'Ayoo selamat kan dunia, dan dapatkan hadiah:3, Semakin tinggi level karakter anda, maka semakin tinggi juga hadiah yang di dapatkan', buttons: buttons, headerType: 4}
if (!q) return nayla.sendMessage(from, buttonMessage)
if (MyData("karakter", sender) == "windbot") { var hadiah1 = [410,482,489,417,418,472,891,620] }
if (MyData("karakter", sender) == "waterbot") { var hadiah1 = [1410,2482,3489,1417,2418,3472,1891,2620] }
if (MyData("karakter", sender) == "soilbot") { var hadiah1 = [2410,3482,4489,5417,3418,4472,5891,3620] }
if (MyData("karakter", sender) == "listrikbot") { var hadiah1 = [4410,5482,6489,7417,5418,6472,8891,7620] }
if (MyData("karakter", sender) == "firebot") { var hadiah1 = [10410,11482,12489,13417,12418,11472,13891,11620] }
const energi = [20,32,43,57,62,79,82,92][Math.floor(Math.random() * ([20,32,43,57,62,79,82,92].length))]
const uang = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random() * ([1,2,3,4,5,6,7,8,9].length))]
const hadiah = hadiah1[Math.floor(Math.random() * (hadiah1.length))]
if (q == 1) {
const buttonss = [{buttonId: `${prefix + command} 1`, buttonText: {displayText: 'GO AGAIN!!!!'}, type: 1}]
const buttonMessagee = { image: {url: 'https://t-2.tstatic.net/tribunkaltimwiki/foto/bank/images/peta-indonesia.jpg'}, caption: "[ *THE WORLD* ]", footer: `*Status* : Sukses\n*Hadiah* : ${hadiah} *Medali*\n*Uang* : $${uang}\n*Energi* : ${MyData("energi", sender) - energi}\nMasih banyak musuh diluar sana, ayo serang lagi,\nNote: Kumpulkan medali sebanyak mungkin, dan jual di ${prefix}sell\nSetiap serangan membutuhkan energi`, buttons: buttonss, headerType: 4}
nayla.sendMessage(from, buttonMessagee)
dataJson("-energi", sender, energi)
dataJson("+medali", sender, hadiah)
dataJson("+uang", sender, uang)}
break
case 'buyenergi':
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const sections = [{title: "ENERGI", rows: [
{title: "105 Energi", rowId: `${prefix + command} 1`, description: "Harga $100 "},
{title: "225 Energi", rowId: `${prefix + command} 2`, description: "Harga $200 "},
{title: "320 Energi", rowId: `${prefix + command} 3`, description: "Harga $300 "},
{title: "450 Energi", rowId: `${prefix + command} 4`, description: "Harga $400 "},
{title: "570 Energi", rowId: `${prefix + command} 5`, description: "Harga $500 "}]}]
const listMessage = { text: `> Uang kamu sekarang *$${MyData("uang",sender)}*`, footer: "Gratis ongkir seluruh indonesia", title: "[ *BELANJA SEMUA DI SHOPEE* ]", buttonText: "LIST ENERGI",sections}
if (!q) return nayla.sendMessage(from, listMessage)
if (q == 1) { if (MyData("uang",sender) <= 99) return harga(100)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 100}\n*Energi sekarang* : ${MyData("energi", sender) + 105}\n*Ongkir* : $0`)
dataJson("-uang", sender, 100)
dataJson("+energi", sender, 105)
}
if (q == 2) { if (MyData("uang",sender) <= 199) return harga(200)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 200}\n*Energi sekarang* : ${MyData("energi", sender) + 225}\n*Ongkir* : $0`)
dataJson("-uang", sender, 200)
dataJson("+energi", sender, 225)
}
if (q == 3) { if (MyData("uang",sender) <= 299) return harga(300)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 300}\n*Energi sekarang* : ${MyData("energi", sender) + 320}\n*Ongkir* : $0`)
dataJson("-uang", sender, 300)
dataJson("+energi", sender, 320)
}
if (q == 4) { if (MyData("uang",sender) <= 399) return harga(400)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 400}\n*Energi sekarang* : ${MyData("energi", sender) + 450}\n*Ongkir* : $0`)
dataJson("-uang", sender, 400)
dataJson("+energi", sender, 450)
}
if (q == 5) { if (MyData("uang",sender) <= 499) return harga(500)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 500}\n*Energi sekarang* : ${MyData("energi", sender) + 570}\n*Ongkir* : $0`)
dataJson("-uang", sender, 500)
dataJson("+energi", sender, 570)
}
break
case 'mykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
textOverlay(pushname, `Karakter anda : ${MyData("karakter", sender)}`, `${MyData("karakter", sender)}`,"menu-img")
break
case 'myuang':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Uang : $${MyData("uang",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'myexp':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Exp : ${MyData("exp",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'mymedali':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Medali : ${MyData("medali",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'myenergi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Energi : ${MyData("energi",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'sell':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
const listMessagse1 = { text: `> Medali kamu sekarang *$${MyData("medali",sender)}*`, footer: "Note: Tidak ada diskon pada penjualan ini", title: "[ *MEDALI TO UANG* ]", buttonText: "LIST",
sections: [{title: "MEDALI", rows: [
{title: "Penawaran (1)", rowId: `${prefix + command} x1`, description: "100 Medali => $1"},
{title: "Penawaran (2)", rowId: `${prefix + command} x2`, description: "1.000 Medali => $10"},
{title: "Penawaran (3)", rowId: `${prefix + command} x3`, description: "10.000 Medali => $100"},
{title: "Penawaran (4)", rowId: `${prefix + command} x4`, description: "100.000 Medali => $1000"},]
}]}
if (!q) return nayla.sendMessage(from, listMessagse1)
if (q == "x1"){
var x1 = 1
var x2 = 100
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x2"){
var x1 = 10
var x2 = 1000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x3"){
var x1 = 100
var x2 = 10000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x4"){
var x1 = 1000
var x2 = 100000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}


break 
case 'judi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
const listMessagse = { text: `> Uang kamu sekarang *$${MyData("uang",sender)}*`, footer: "Note: Kesempatan menang pada judi *15%*", title: "[ *JUDI-DOLAR* ]", buttonText: "LIST TARUHAN",
sections: [{title: "JUDI", rows: [
{title: "easy", rowId: `${prefix + command} x1`, description: "Taruhan $15"},
{title: "medium", rowId: `${prefix + command} x2`, description: "Taruhan $120"},
{title: "hard", rowId: `${prefix + command} x3`, description: "Taruhan $560"},
{title: ":v", rowId: `${prefix + command} x4`, description: "Taruhan $1480"}]}]
}
const judi = [false, false, true, false][Math.floor(Math.random() * ([false, false, true, false].length))]
if (!q) return nayla.sendMessage(from, listMessagse)
if (q == "x1") { const judii = 15 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x2") { const judii = 120
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x3") { const judii = 560 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x4") { const judii = 1480 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}
break
case 'claim':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("status", sender) == false) return reply("Fitur ini khusus User premium")
const medaliz = [1000,2000,3000,4000,5000][Math.floor(Math.random() * ([1000,2000,3000,4000,5000].length))]
dataJson("+medali", sender, medaliz)
reply(`Sukses claim,\n*Total* : ${medaliz}\n\nNote: Medali bisa di jual menjadi uang di ${prefix}sell`)
break
case 'anjing1': case 'ampun': case 'tom': case 'tokdalang': case 'cerdas': 
case 'tampar': case 'meme2': case 'meme1': case 'anjing3': case 'anjing2': 
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Masukkan text\n" + `Contoh? ${prefix + command} Yo ndak tau kok tanya saya`)
sendMedia("image", `https://md-devs.herokuapp.com/api/rimurubotz?type=${command}&text=${q}`, ":3")
break
// 2
case 'curiga':case 'anda':case 'anjing4':case 'heran':case 'macan':case 'mobil':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Masukkan text\n" + `Contoh? ${prefix + command} udin&jamal`)
if (q2 && q1) {
sendMedia("image", `https://md-devs.herokuapp.com/api/rimurubotz?type=${command}&text1=${q1}&text2=${q2}`, ":3")
} else { reply(`Masukkan text1&text2\nContoh? ${prefix + command} udin&jamal`)}
break
case 'simi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Masukkan chat:3\n" + `*Contoh* : ${prefix + command} halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(simi1 => {reply(simi1.success)})
break
case 'brainly':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const { Brainly } = require("brainly-scraper-v2");
const brain = new Brainly("id"); 
if (!q) return reply("Masukkan soal")
const nx = await brain.searchWithMT(q, "id")
reply(`[ *BRAINLY* ]\n
• *Soal* : ${q}
• *Pelajaran* : ${nx[0].question.education}
• *Kelas* : ${nx[0].question.grade}
• *Jawaban* : ${nx[0].answers[0].content}`) 
break
case 'sticker': case 'stiker': case 's':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isImage || isQuotedImage) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'sticker/'+getRandom('.jpg')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
nayla.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: nay })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else if (isVideo || isQuotedVideo) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'sticker/'+getRandom('.mp4')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
nayla.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: nay })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else {
reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 5 detik!`)
}
break 
case 'audio1': case 'audio2': case 'audio3': case 'audio5': case 'audio4': case 'audio6': case 'audio7': case 'audio8': case 'audio9': case 'audio10': case 'audio11': case 'audio12': case 'audio13': case 'audio14': case 'audio15': case 'audio16': case 'audio17': case 'audio18': case 'audio19': case 'audio20': 
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
sendAudio(command1)
break
case 'owner':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const ownewr = ownerNumber.split('@')[0]
nayla.sendMessage(from, {text: `@${ownewr}`, mentions: [ownerNumber]} )
break
case 'ahegao':
case 'jahy':
case 'masturbation':
case 'panties':
case 'orgy':
case 'pussy':
case 'thighs':
case 'yuri':
case 'hentai':
case 'glasses':
case 'gangbang':
case 'foot':
case 'femdom':
case 'cum':
case 'ero':
case 'cuckold':
case 'blowjob':
case 'bdsm':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("status", sender) == false) return reply("FITUR INI KHUSUS USER PREMIUM\n\n" + `~> Dapatkan premium di\n> ${prefix}getprem\n~> Atau beli premium Di Owner bot`)
fetchJson(`https://api-yogipw.herokuapp.com/api/nsfw/${command}`)
.then(nsfw => { sendMedia("image", nsfw.result, "Sangat indah bukan?")})
break
case 'sc': case 'script':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
reply(`https://semawur.com/6df19ZzNz`)
break
case 'tebakgambar': 
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (tebakgambar.hasOwnProperty(sender.split('@')[0])) return reply("Selesein yg sebelumnya dulu atuh")
const kuis1 = await fetchJson(`https://md-devs.herokuapp.com/api/rimurubotz?type=tebakgambar`)
sendMedia("image", kuis1.result.image, `[ *TEBAKGAMBAR* ]\n> *Clue* : ${kuis1.result.clue}\n> *Note* : Jawab jawaban ini dengan benar sebelum 30 detik, Dan dapatkan hadiah`).then(() => {
tebakgambar[sender.split('@')[0]] = kuis1.result.jawaban.toLowerCase()
fs.writeFileSync("./db/function/tebakgambar.json", JSON.stringify(tebakgambar))
sleep(30000)})
console.log(kuis1.result.jawaban)
setTimeout( () => {
reply(`[ *WAKTU HABIS:(* ]\n> *Jawaban* : ${kuis1.result.jawaban}`)
delete tebakgambar[sender.split('@')[0]]
fs.writeFileSync("./db/function/tebakgambar.json", JSON.stringify(tebakgambar))
}, 30000)
break
case 'antilink':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply(`[ *ANTILINK* ]\n~> *ON*\n• ${prefix + command} on\n~> *OFF*\n• ${prefix + command} off`)
if (q == "on"){
antilink.push(from)
fs.writeFileSync('./db/function/antilink.json', JSON.stringify(antilink))
reply("SUKSES ON")}
if (q == "off"){
antilink.splice(from, 1)
fs.writeFileSync('./db/function/antilink.json', JSON.stringify(antilink))
reply("SUKSES OFF")}
break

case 'welcome':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply(`[ *WELCOME* ]\n~> *ON*\n• ${prefix + command} on\n~> *OFF*\n• ${prefix + command} off`)
if (q == "on"){
welcome.push(from)
fs.writeFileSync('./db/function/welcome.json', JSON.stringify(welcome))
reply("SUKSES ON")}
if (q == "off"){
welcome.splice(from, 1)
fs.writeFileSync('./db/function/welcome.json', JSON.stringify(welcome))
reply("SUKSES OFF")}
break

case 'editinfo':
case 'editinfogroup':
case 'editinfogrup':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (args[0] === 'all') {
await nayla.groupSettingUpdate(from, 'unlocked')
} else if (args[0] === 'admin') {
await nayla.groupSettingUpdate(from, 'locked')
} else {
reply("Masukkan query all/admin")
}
break
case 'group':
case 'grup':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (args[0] === 'close') {
await nayla.groupSettingUpdate(from, 'announcement')
} else if (args[0] === 'open') {
await nayla.groupSettingUpdate(from, 'not_announcement')
} else {
reply("Masukkan query open/close")
}
break
case 'promote':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (nay.message.extendedTextMessage === undefined || nay.message.extendedTextMessage === null) return reply('Tag orang yang ingin dipromosikan menjadi admin group');
const men = nay.message.extendedTextMessage.contextInfo.mentionedJid;
nayla.groupParticipantsUpdate(from, men,"promote");
break
case 'demote':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (nay.message.extendedTextMessage === undefined || nay.message.extendedTextMessage === null) return reply('Tag orang yang ingin di demote di group ini');
const mention = nay.message.extendedTextMessage.contextInfo.mentionedJid;
await nayla.groupParticipantsUpdate(from, mention,"demote");
break
case 'add':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply("Masukan nomor yang ingin ditambahkan di group\nex: !add 62881xxxxxxx")
nomor = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
await nayla.groupParticipantsUpdate(from, [nomor],"add")
break
case 'kick':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (nay.message.extendedTextMessage === undefined || nay.message.extendedTextMessage === null) return reply('Tag orang yang ingin dikeluarkan dari group ini')
const mentioyn = nay.message.extendedTextMessage.contextInfo.mentionedJid
await nayla.groupParticipantsUpdate(from, mentioyn,"remove")
break
case 'resetlink':
case 'revoke':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
await nayla.groupRevokeInvite(from)
break
case 'linkgroup':case 'linkgc':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
const code = await nayla.groupInviteCode(from)
reply("https://chat.whatsapp.com/" + code)
break
case 'setdesc':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply("Masukkan text")
nayla.groupUpdateDescription(from, q)
break
case 'setname':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply("Masukkan text")
nayla.groupUpdateSubject(from, q);
break
case 'getprem':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Gunakan fitur ini di pesan pribadi")
if (MyData("status", sender) == true) return reply("Anda Adalah user premium")
if (!q) return reply("Masukkan kodeprem")
if (q == kodeprem){reply("Selamat anda telah menjadi user premium")
dataJson("±status", sender, true)} else {reply("kodeprem Salah, Silahkan dapatkan kode prem di owner")}
break
case 'setemote': case 'setemoji':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("status", sender) == false) return reply("FITUR INI KHUSUS USER PREMIUM\n\n" + `~> Dapatkan premium di\n> ${prefix}getprem\n~> Atau beli premium Di Owner bot`)
if (q.length > 2) return reply("Emote cukup 1, contoh 😀")
dataJson("±emote", sender, q)
nayla.sendMessage(from, { react: { text: q, key: nay.key}})
reply("Done")
break
case 'chat':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply(`Masukkan nomer&nama&chat\n> *Contoh?* : ${prefix + command} 6282347260729&Jokowi&Selamat pagi`)
if (!q1) return reply(`Masukkan nomer&nama&chat\n> *Contoh?* : ${prefix + command} 6282347260729&Jokowi&Selamat pagi`)
if (!q2) return reply(`Masukkan nomer&nama&chat\n> *Contoh?* : ${prefix + command} 6282347260729&Jokowi&Selamat pagi`)
if (!q3) return reply(`Masukkan nomer&nama&chat\n> *Contoh?* : ${prefix + command} 6282347260729&Jokowi&Selamat pagi`)
nayla.sendMessage(`${q1}@s.whatsapp.net`, {image:{url:"https://cdn-icons-png.flaticon.com/512/4712/4712029.png"}, caption:`Halo Ada pesan nih:3\n> *Dari* : ${q2}\n> *Jam* : ${jam}\n> *Pesan* : ${q3}`})
reply("Sukses")
break


case 'maker1': 
case 'maker2': 
case 'maker3': 
case 'maker4': 
case 'maker5': 
case 'maker6': 
case 'maker7': 
case 'maker8': 
case 'maker9': 
case 'maker10': 
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Kirim image dengan caption, contoh?? https://i.ibb.co/pQd9ZnH/Screenshot-2022-07-30-06-43-46-66-6012fa4d4ddec268fc5c7112cbb265e7.jpg")
if (isImage || isQuotedImage) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync("./sukses.jpg", buffer)
var x1 = 1
var x2 = 1
var x3 = 1
var x4 = 1
if (command == "maker1") { x1 = 254, x2 = 73, x3 = 110, x4 = 553 }
if (command == "maker2") { x1 = 233, x2 = 149, x3 = 448, x4 = 600 } 
if (command == "maker3") { x1 = 809, x2 = 50, x3 = 75, x4 = 580 }
if (command == "maker4") { x1 = 150, x2 = 122, x3 = 480, x4 = 562 }
if (command == "maker5") { x1 = 703, x2 = 70, x3 = 140, x4 = 560 }
if (command == "maker6") { x1 = 702, x2 = 70, x3 = 140, x4 = 560 }
if (command == "maker7") { x1 = 120, x2 = 104, x3 = 540, x4 = 543 }
if (command == "maker8") { x1 = 656, x2 = 129, x3 = 520, x4 = 598 }
if (command == "maker9") { x1 = 245, x2 = 104, x3 = 520, x4 = 598 }
if (command == "maker10") { x1 = 106, x2 = 140, x3 = 470, x4 = 580 }
maker(command, x1, x2, q, x3, x4, "./sukses.jpg")  
} else {reply("Kirim image dengan caption, contoh?? https://i.ibb.co/pQd9ZnH/Screenshot-2022-07-30-06-43-46-66-6012fa4d4ddec268fc5c7112cbb265e7.jpg")}
break

case 'tahlil':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return  reply(`Pilih angka 1-44\ncontoh ${prefix + command} 13\nUntuk list Angka(Nama) Silahkan cek di https://md-devs.herokuapp.com/list-tahlil`)
fetchJson("https://islamic-api-zhirrr.vercel.app/api/tahlil")
.then(x => { 
var tahlil = "[ *TAHLIL* ]\n\n"
Object.keys(x.data).forEach((i) => {
if (x.data[i].id == q){
tahlil += `• *Id* : ${x.data[i].id}\n`
tahlil += `• *Title* : ${x.data[i].title}\n`
tahlil += `• *Arabic* : ${x.data[i].arabic}\n`
tahlil += `• *Translation* : ${x.data[i].translation}\n`
}}) 
tahlil += `\n*Note* : Pilih angka 1-44\ncontoh ${prefix + command} 13\nUntuk list Angka(Nama) Silahkan cek di https://md-devs.herokuapp.com/list-tahlil`
reply(tahlil)})
break
case 'asmaulhusna':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
fetchJson("https://islamic-api-zhirrr.vercel.app/api/asmaulhusna")
.then(x => { 
const xx = x.data[Math.floor(Math.random() * (x.data.length))]
reply(`[ *ASMAULHUSNA* ]\n• *No* : ${xx.index}\n• *Latin* : ${xx.latin}\n• *Arab* : ${xx.arabic}\n• *Id* : ${xx.translation_id}\n• *En* : ${xx.translation_en}\n\nNote: Asmaul husna random 1-99`)
})
break
case 'doaharian':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
fetchJson("https://islamic-api-zhirrr.vercel.app/api/doaharian")
.then(x => { 
const xx = x.data[Math.floor(Math.random() * (x.data.length))]
reply(`[ *DOA HARIAN* ]\n• *Title* : ${xx.title}\n• *Arabic* : ${xx.arabic}\n• *Translation* : ${xx.translation}\n\nNote: Doa harian random`)})
break
case 'ayatkursi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
fetchJson("https://islamic-api-zhirrr.vercel.app/api/ayatkursi")
.then(x => { 
reply(`[ *AYAT KURSI* ]\n• *Tafsir* : ${x.data.tafsir}\n• *Arabic* : ${x.data.arabic}\n• *Latin* : ${x.data.latin}\n• *Translation* : ${x.data.translation}`)})
break
case 'niatshalat': case 'niatsholat':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
fetchJson("https://islamic-api-zhirrr.vercel.app/api/niatshalat")
.then(x => { 
var niatshalat = "[ *NIAT SHOLAT* ]\n"
Object.keys(x).forEach((i) => {
niatshalat += `• *Id* : ${x[i].id}\n`
niatshalat += `• *Name* : ${x[i].name}\n`
niatshalat += `• *Arabic* : ${x[i].arabic}\n`
niatshalat += `• *Latin* : ${x[i].latin}\n`
niatshalat += `• *Terjemahan* : ${x[i].terjemahan}\n`
})
reply(niatshalat)
})
case 'bacaanshalat': case 'bacaansholat':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
fetchJson("https://islamic-api-zhirrr.vercel.app/api/bacaanshalat")
.then(x => {
var bacaanshalat = "[ *BACAAN SHOLAT* ]\n"
Object.keys(x).forEach((i) => {
bacaanshalat += `• *Id* : ${x[i].id}\n`
bacaanshalat += `• *Name* : ${x[i].name}\n`
bacaanshalat += `• *Arabic* : ${x[i].arabic}\n`
bacaanshalat += `• *Latin* : ${x[i].latin}\n`
bacaanshalat += `• *Terjemahan* : ${x[i].terjemahan}\n`
})
reply(bacaanshalat)
})
break
case 'runtime':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
reply(`Runtime : ${runtime(process.uptime())}`)
break
default:
if (isAntilink) {
if (!isGroup) return
if (budy.includes("http")) { reply("ANTILINK")
await nayla.groupParticipantsUpdate(from, [sender], "remove")}
}
}
} catch (err) {
console.log(color('[ERROR]', 'red'), err)
}
}


