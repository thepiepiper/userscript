// ==UserScript==
// @name        vk.com рассылка
// @namespace   vk.com
// @include     http://vk.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==


$(function(){
    var name = $('div#profile_info h4.simple div.page_name').html();
    name = name.split(' ')[0];
    console.log(name);
    
    $('div#profile_main_actions div#profile_message_send.profile_action_btn div.button_wide a.button_link.cut_left').trigger('click');
    setTimeout(function(){
	console.log($('div.mail_box_content div.labeled textarea#write_box_text'));
	$('div.mail_box_content div.labeled textarea#write_box_text').val(
"Здравствуйте, " + name + "!\n\
\n\
Вы недавно вступили в группу Системно-векторной \n\
психологии. Если вы еще не успели изучить содержание нашей группы, позвольте\n\
вам немного рассказать о том, чему она посвящена.\n\
\n\
Системно-векторная психология рассматривает тип\n\
характера человека с точки зрения восьми эрогенных зон. Для удобства вводится\n\
понятие «вектор» - это особо чувствительная эрогенная зона, которая определяет\n\
группу свойств и желаний, формирующих характер человека, его внутреннюю систему\n\
ценностей, сексуальные предпочтения, его поведение и адаптацию в социуме.\n\
\n\
Зная врожденные свойства человека, его\n\
предрасположенности, таланты, мы можем предопределить его желания, мысли и\n\
действия.\n\
\n\
yburlan.ru - это ссылка на наш портал.\n\
\n\
yburlan.ru/biblioteka - Библиотека.\n\
Здесь можно найти как общие статьи о том, что\n\
такое Системно-векторная психология, краткое описание каждого вектора, так и\n\
большое количество статей на другие, самые разнообразные,тематики, такие как\n\
взаимоотношения, сексуальность, причины плохих и депрессивных состояний,\n\
общественные и социальные вопросы и явления с точки зрения систмено-векторного\n\
подхода и многое другое.\n\
\n\
http://www.yburlan.ru/forum - Форум.\n\
Здесь, зарегистрировавшись, вы сможете найти огромное\n\
количество постов и конспектов людей, прошедших или проходящих тренинг.\n\
\n\
Результаты и впечатления людей от\n\
Системно-векторной психологии:\n\
http://www.yburlan.ru/forum/rezul-taty-proshedshix-trening-48/\n\
http://www.yburlan.ru/videoblog\n\
\n\
Также регулярно проводятся циклы бесплатных онлайн\n\
занятий, включающие в себя Вводное и два полноценных тренинга по Кожному и\n\
Анальному векторам, ближайшая лекция состоится уже сегодня:\n\
\n\
Вводная лекция: 16 июля, Понедельник, в 21.45 (мск)\n\
Кожный вектор: 17 июля, Вторник, в 21.45 (мск)\n\
Анальный вектор: 19 июля, Четверг, в 21.45 (мск)\n\
\n\
Тренинги проходят онлайн в интернете.\n\
\n\
Зарегистрироваться\n\
на них можно прямо сейчас по следующей ссылке -\n\
http://www.yburlan.ru/besplatnye-treningi\n\
\n\
Спасибо за интерес к нашей группе!\n\
\n\
Спрашивайте, если будут вопросы,\n\
Будем рады общению."
	);
    }, 3000);
});

 
