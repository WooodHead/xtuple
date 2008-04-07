BEGIN;
SELECT dropIfExists('TABLE', 'lang');

CREATE TABLE lang (
  lang_id        SERIAL PRIMARY KEY,
  lang_qt_number INTEGER,
  lang_abbr3     TEXT,
  lang_abbr2     TEXT,
  lang_name      TEXT   NOT NULL
                  );
COMMENT ON TABLE lang IS
'Table mapping ISO 639-1 and 639-2 language codes to Qt''s enum QLocale::Language integer values. See http://www.loc.gov/standards/iso639-2/php/code_list.php and the QLocale documentation..';

COMMENT ON COLUMN lang.lang_abbr2 IS 'ISO 639-1 code for language';
COMMENT ON COLUMN lang.lang_abbr3 IS 'ISO 639-2 code for language. Where there is a choice between bibliographic (B) and terminology (T) usage, this value is the T code';
COMMENT ON COLUMN lang.lang_name  IS 'Name of a human language, taken from the ISO 639-2 documentation';

REVOKE ALL ON lang FROM PUBLIC;
GRANT ALL ON lang TO GROUP openmfg;

REVOKE ALL ON lang_lang_id_seq FROM PUBLIC;
GRANT ALL ON lang_lang_id_seq TO GROUP openmfg;


COPY lang (lang_qt_number, lang_abbr3, lang_abbr2, lang_name) FROM STDIN;
3	\N	\N	Afan
156	\N	\N	Atsam
16	\N	\N	Bhutani
22	\N	\N	Byelorussian
23	\N	\N	Cambodian
158	\N	\N	Jju
154	\N	\N	Koro
68	\N	\N	Kurundi
69	\N	\N	Laothian
101	\N	\N	SerboCroatian
102	\N	\N	Sesotho
103	\N	\N	Setswana
107	\N	\N	Siswati
164	\N	\N	Tyap
\N	ace	\N	Achinese
\N	ach	\N	Acoli
\N	ada	\N	Adangme
\N	ady	\N	Adyghe\; Adygei
\N	afa	\N	Afro-Asiatic.(Other)
\N	afh	\N	Afrihili
\N	ain	\N	Ainu
\N	akk	\N	Akkadian
\N	ale	\N	Aleut
\N	alg	\N	Algonquian languages
\N	alt	\N	Southern Altai
\N	ang	\N	English, Old (ca.450-1100)
\N	anp	\N	Angika
\N	apa	\N	Apache languages
\N	arc	\N	Official Aramaic (700-300 BCE)\; Imperial Aramaic (700-300 BCE)
\N	arn	\N	Mapudungun\; Mapuche
\N	arp	\N	Arapaho
\N	art	\N	Artificial (Other)
\N	arw	\N	Arawak
\N	ast	\N	Asturian\; Bable\; Leonese\; Asturleonese
\N	ath	\N	Athapascan languages
\N	aus	\N	Australian languages
\N	awa	\N	Awadhi
\N	bad	\N	Banda languages
\N	bai	\N	Bamileke languages
\N	bal	\N	Baluchi
\N	ban	\N	Balinese
\N	bas	\N	Basa
\N	bat	\N	Baltic (Other)
\N	bej	\N	Beja\; Bedawiyet
\N	bem	\N	Bemba
\N	ber	\N	Berber (Other)
\N	bho	\N	Bhojpuri
\N	bik	\N	Bikol
\N	bin	\N	Bini\; Edo
\N	bla	\N	Siksika
\N	bnt	\N	Bantu (Other)
\N	bra	\N	Braj
\N	btk	\N	Batak languages
\N	bua	\N	Buriat
\N	bug	\N	Buginese
152	byn	\N	Blin\; Bilin
\N	cad	\N	Caddo
\N	cai	\N	Central American Indian (Other)
\N	car	\N	Galibi Carib
\N	cau	\N	Caucasian (Other)
\N	ceb	\N	Cebuano
\N	cel	\N	Celtic (Other)
\N	chb	\N	Chibcha
\N	chg	\N	Chagatai
\N	chk	\N	Chuukese
\N	chm	\N	Mari
\N	chn	\N	Chinook jargon
\N	cho	\N	Choctaw
\N	chp	\N	Chipewyan\; Dene Suline
\N	chr	\N	Cherokee
\N	chy	\N	Cheyenne
\N	cmc	\N	Chamic languages
\N	cop	\N	Coptic
\N	cpe	\N	Creoles and pidgins, English-based (Other)
\N	cpf	\N	Creoles and pidgins, French-based (Other)
\N	cpp	\N	Creoles and pidgins, Portuguese-based (Other)
\N	crh	\N	Crimean Tatar\; Crimean Turkish
\N	crp	\N	Creoles and pidgins (Other)
\N	csb	\N	Kashubian
\N	cus	\N	Cushitic (Other)
\N	dak	\N	Dakota
\N	dar	\N	Dargwa
\N	day	\N	Land Dayak languages
\N	del	\N	Delaware
\N	den	\N	Slave (Athapascan)
\N	dgr	\N	Dogrib
\N	din	\N	Dinka
\N	doi	\N	Dogri
\N	dra	\N	Dravidian (Other)
\N	dsb	\N	Lower Sorbian
\N	dua	\N	Duala
\N	dum	\N	Dutch, Middle (ca.1050-1350)
\N	dyu	\N	Dyula
\N	efi	\N	Efik
\N	egy	\N	Egyptian (Ancient)
\N	eka	\N	Ekajuk
\N	elx	\N	Elamite
\N	enm	\N	English, Middle (1100-1500)
\N	ewo	\N	Ewondo
\N	fan	\N	Fang
\N	fat	\N	Fanti
\N	fil	\N	Filipino\; Pilipino
\N	fiu	\N	Finno-Ugrian (Other)
\N	fon	\N	Fon
\N	frm	\N	French, Middle (ca.1400-1600)
\N	fro	\N	French, Old (842-ca.1400)
38	frr	\N	Northern Frisian
38	frs	\N	Eastern Frisian
159	fur	\N	Friulian
148	gaa	\N	Ga
\N	gay	\N	Gayo
\N	gba	\N	Gbaya
\N	gem	\N	Germanic (Other)
153	gez	\N	Geez
\N	gil	\N	Gilbertese
\N	gmh	\N	German, Middle High (ca.1050-1500)
\N	goh	\N	German, Old High (ca.750-1050)
\N	gon	\N	Gondi
\N	gor	\N	Gorontalo
\N	got	\N	Gothic
\N	grb	\N	Grebo
\N	grc	\N	Greek, Ancient (to 1453)
\N	gsw	\N	Swiss German\; Alemannic\; Alsatian
\N	gwi	\N	Gwich'in
\N	hai	\N	Haida
163	haw	\N	Hawaiian
\N	hil	\N	Hiligaynon
\N	him	\N	Himachali
\N	hit	\N	Hittite
\N	hmn	\N	Hmong
\N	hsb	\N	Upper Sorbian
\N	hup	\N	Hupa hupa
\N	iba	\N	Iban
\N	ijo	\N	Ijo languages
\N	ilo	\N	Iloko
\N	inc	\N	Indic (Other)
\N	ine	\N	Indo-European (Other)
\N	inh	\N	Ingush
\N	ira	\N	Iranian (Other)
\N	iro	\N	Iroquoian languages
\N	jbo	\N	Lojban
\N	jpr	\N	Judeo-Persian
\N	jrb	\N	Judeo-Arabic
\N	kaa	\N	Kara-Kalpak
\N	kab	\N	Kabyle
\N	kac	\N	Kachin\; Jingpho
150	kam	\N	Kamba
\N	kar	\N	Karen languages
\N	kaw	\N	Kawi
\N	kbd	\N	Kabardian
\N	kha	\N	Khasi
\N	khi	\N	Khoisan (Other)
\N	kho	\N	Khotanese
\N	kmb	\N	Kimbundu
147	kok	\N	Konkani
\N	kos	\N	Kosraean
\N	kpe	\N	Kpelle
\N	krc	\N	Karachay-Balkar
\N	krl	\N	Karelian
\N	kro	\N	Kru languages
\N	kru	\N	Kurukh
\N	kum	\N	Kumyk
\N	kut	\N	Kutenai
\N	lad	\N	Ladino
\N	lah	\N	Lahnda
\N	lam	\N	Lamba
\N	lez	\N	Lezghian
\N	lol	\N	Mongo
\N	loz	\N	Lozi
\N	lua	\N	Luba-Lulua
\N	lui	\N	Luiseno
\N	lun	\N	Lunda
\N	luo	\N	Luo (Kenya and Tanzania)
\N	lus	\N	Lushai
\N	mad	\N	Madurese
\N	mag	\N	Magahi
\N	mai	\N	Maithili
\N	mak	\N	Makasar
\N	man	\N	Mandingo
\N	map	\N	Austronesian (Other)
\N	mas	\N	Masai
\N	mdf	\N	Moksha
\N	mdr	\N	Mandar
\N	men	\N	Mende
\N	mga	\N	Irish, Middle (900-1200)
\N	mic	\N	Mi'kmaq\; Micmac
\N	min	\N	Minangkabau
\N	mis	\N	Uncoded languages
\N	mkh	\N	Mon-Khmer (Other)
\N	mnc	\N	Manchu
\N	mni	\N	Manipuri
\N	mno	\N	Manobo languages
\N	moh	\N	Mohawk
\N	mos	\N	Mossi
\N	mul	\N	Multiple languages
\N	mun	\N	Munda languages
\N	mus	\N	Creek
\N	mwl	\N	Mirandese
\N	mwr	\N	Marwari
\N	myn	\N	Mayan languages
\N	myv	\N	Erzya
\N	nah	\N	Nahuatl languages
\N	nai	\N	North American Indian
\N	nap	\N	Neapolitan
\N	nds	\N	Low German\; Low Saxon\; German, Low\; Saxon, Low
\N	new	\N	Nepal Bhasa\; Newari
\N	nia	\N	Nias
\N	nic	\N	Niger-Kordofanian (Other)
\N	niu	\N	Niuean
\N	nog	\N	Nogai
\N	non	\N	Norse, Old
\N	nqo	\N	N'Ko
\N	nso	\N	Pedi\; Sepedi\; Northern Sotho
\N	nub	\N	Nubian languages
\N	nwc	\N	Classical Newari\; Old Newari\; Classical Nepal Bhasa
\N	nym	\N	Nyamwezi
\N	nyn	\N	Nyankole
\N	nyo	\N	Nyoro
\N	nzi	\N	Nzima
\N	osa	\N	Osage
\N	ota	\N	Turkish, Ottoman (1500-1928)
\N	oto	\N	Otomian languages
\N	paa	\N	Papuan (Other)
\N	pag	\N	Pangasinan
\N	pal	\N	Pahlavi
\N	pam	\N	Pampanga\; Kapampangan
\N	pap	\N	Papiamento
\N	pau	\N	Palauan
\N	peo	\N	Persian, Old (ca.600-400 B.C.)
\N	phi	\N	Philippine (Other)
\N	phn	\N	Phoenician
\N	pon	\N	Pohnpeian
\N	pra	\N	Prakrit languages
\N	pro	\N	Provencal, Old (to 1500)
\N	raj	\N	Rajasthani
\N	rap	\N	Rapanui
\N	rar	\N	Rarotongan\; Cook Islands Maori
\N	roa	\N	Romance (Other)
\N	rom	\N	Romany
\N	rup	\N	Aromanian\; Arumanian\; Macedo-Romanian
\N	sad	\N	Sandawe
\N	sah	\N	Yakut
\N	sai	\N	South American Indian (Other)
\N	sal	\N	Salishan languages
\N	sam	\N	Samaritan Aramaic
\N	sas	\N	Sasak
\N	sat	\N	Santali
\N	scn	\N	Sicilian
\N	sco	\N	Scots
\N	sel	\N	Selkup
\N	sem	\N	Semitic (Other)
\N	sga	\N	Irish, Old (to 900)
\N	sgn	\N	Sign languages
\N	shn	\N	Shan
155	sid	\N	Sidamo
\N	sio	\N	Siouan languages
\N	sit	\N	Sino-Tibetan (Other)
\N	sla	\N	Slavic (Other)
\N	sma	\N	Southern Sami
\N	smi	\N	Sami languages (Other)
\N	smj	\N	Lule Sami
\N	smn	\N	Inari Sami
\N	sms	\N	Skolt Sami
\N	snk	\N	Soninke
\N	sog	\N	Sogdian
\N	son	\N	Songhai languages
\N	srn	\N	Sranan Tongo
\N	srr	\N	Serer
\N	ssa	\N	Nilo-Saharan (Other)
\N	suk	\N	Sukuma
\N	sus	\N	Susu
\N	sux	\N	Sumerian
\N	syc	\N	Classical Syriac
151	syr	\N	Syriac
\N	tai	\N	Tai (Other)
\N	tem	\N	Timne
\N	ter	\N	Tereno
\N	tet	\N	Tetum
157	tig	\N	Tigre
\N	tiv	\N	Tiv
\N	tkl	\N	Tokelau
\N	tlh	\N	Klingon
\N	tli	\N	Tlingit
\N	tmh	\N	Tamashek
\N	tog	\N	Tonga (Nyasa)
\N	tpi	\N	Tok Pisin
\N	tsi	\N	Tsimshian
\N	tum	\N	Tumbuka
\N	tup	\N	Tupi languages
\N	tut	\N	Altaic (Other)
\N	tvl	\N	Tuvalu
\N	tyv	\N	Tuvinian
\N	udm	\N	Udmurt
\N	uga	\N	Ugaritic
\N	umb	\N	Umbundu
\N	und	\N	Undetermined
\N	vai	\N	Vai
\N	vot	\N	Votic
\N	wak	\N	Wakashan languages
162	wal	\N	Walamo
\N	war	\N	Waray
\N	was	\N	Washo
\N	wen	\N	Sorbian languages
\N	xal	\N	Kalmyk\; Oirat
\N	yao	\N	Yao
\N	yap	\N	Yapese
\N	ypk	\N	Yupik languages
\N	zap	\N	Zapotec
\N	zbl	\N	Blissymbols\; Blissymbolics\; Bliss
\N	zen	\N	Zenaga
\N	znd	\N	Zande languages
\N	zun	\N	Zuni
\N	zxx	\N	No linguistic content
\N	zza	\N	Zaza\; Dimili\; Dimli\; Kirdki\; Kirmanjki\; Zazaki
4	aar	aa	Afar
2	abk	ab	Abkhazian
\N	ave	ae	Avestan
5	afr	af	Afrikaans
146	aka	ak	Akan
7	amh	am	Amharic
\N	arg	an	Aragonese
8	ara	ar	Arabic
10	asm	as	Assamese
\N	ava	av	Avaric
11	aym	ay	Aymara
12	aze	az	Azerbaijani
13	bak	ba	Bashkir
\N	bel	be	Belarusian
20	bul	bg	Bulgarian
17	bih	bh	Bihari
18	bis	bi	Bislama
\N	bam	bm	Bambara
15	ben	bn	Bengali
121	bod	bo	Tibetan
19	bre	br	Breton
142	bos	bs	Bosnian
24	cat	ca	Catalan\; Valencian
\N	che	ce	Chechen
\N	cha	ch	Chamorro
26	cos	co	Corsican
\N	cre	cr	Cree
28	ces	cs	Czech
\N	chu	cu	Church Slavic\; Old Slavonic\; Church Slavonic\; Old Bulgarian\; Old Church Slavonic
\N	chv	cv	Chuvash
134	cym	cy	Welsh
29	dan	da	Danish
42	deu	de	German
143	div	dv	Divehi\; Dhivehi\; Maldivian
\N	dzo	dz	Dzongkha
161	ewe	ee	Ewe
42	ell	el	Greek, Modern (1453-)
31	eng	en	English
32	epo	eo	Esperanto
111	spa	es	Spanish\; Castilian
33	est	et	Estonian
14	eus	eu	Basque
89	fas	fa	Persian
\N	ful	ff	Fulah
36	fin	fi	Finnish
35	fij	fj	Fijian
34	fao	fo	Faroese
37	fra	fr	French
38	fry	fy	Western Frisian
57	gle	ga	Irish
39	gla	gd	Gaelic\; Scottish Gaelic
40	glg	gl	Galician
45	grn	gn	Guarani
46	guj	gu	Gujarati
144	glv	gv	Manx
47	hau	ha	Hausa
48	heb	he	Hebrew
49	hin	hi	Hindi
\N	hmo	ho	Hiri Motu
27	hrv	hr	Croatian
\N	hat	ht	Haitian\; Haitian Creole
50	hun	hu	Hungarian
9	hye	hy	Armenian
\N	her	hz	Herero
53	ina	ia	Interlingua (International Auxiliary language Association)
52	ind	id	Indonesian
54	ile	ie	Interlingue\; Occidental
149	ibo	ig	Igbo
\N	iii	ii	Sichuan Yi\; Nuosu
56	ipk	ik	Inupiaq
\N	ido	io	Ido
51	isl	is	Icelandic
58	ita	it	Italian
55	iku	iu	Inuktitut
59	jpn	ja	Japanese
60	jav	jv	Javanese
41	kat	ka	Georgian
\N	kon	kg	Kongo
\N	kik	ki	Kikuyu\; Gikuyu
\N	kua	kj	Kuanyama\; Kwanyama
63	kaz	kk	Kazakh
44	kal	kl	Kalaallisut\; Greenlandic
\N	khm	km	Central Khmer
61	kan	kn	Kannada
66	kor	ko	Korean
\N	kau	kr	Kanuri
62	kas	ks	Kashmiri
67	kur	ku	Kurdish
\N	kom	kv	Komi
145	cor	kw	Cornish
65	kir	ky	Kirghiz\; Kyrgyz
70	lat	la	Latin
\N	ltz	lb	Luxembourgish\; Letzeburgesch
\N	lug	lg	Ganda
\N	lim	li	Limburgan\; Limburger\; Limburgish
72	lin	ln	Lingala
\N	lao	lo	Lao
73	lit	lt	Lithuanian
\N	lub	lu	Luba-Katanga
71	lav	lv	Latvian
75	mlg	mg	Malagasy
\N	mah	mh	Marshallese
79	mri	mi	Maori
74	mkd	mk	Macedonian
77	mal	ml	Malayalam
82	mon	mn	Mongolian
81	mol	mo	Moldavian
80	mar	mr	Marathi
76	msa	ms	Malay
78	mlt	mt	Maltese
21	mya	my	Burmese
83	nau	na	Nauru
85	nob	nb	Bokmal, Norwegian\; Norwegian Bokmal
\N	nde	nd	Ndebele, North\; North Ndebele
84	nep	ne	Nepali
\N	ndo	ng	Ndonga
30	nld	nl	Dutch\; Flemish
141	nno	nn	Norwegian Nynorsk\; Nynorsk, Norwegian
141	nor	no	Norwegian
\N	nbl	nr	Ndebele, South\; South Ndebele
\N	nav	nv	Navajo\; Navaho
165	nya	ny	Chichewa\; Chewa\; Nyanja
86	oci	oc	Occitan (post 1500)\; Provencal
\N	oji	oj	Ojibwa
\N	orm	om	Oromo
87	ori	or	Oriya
\N	oss	os	Ossetian\; Ossetic
92	pan	pa	Panjabi\; Punjabi
\N	pli	pi	Pali
90	pol	pl	Polish
88	pus	ps	Pushto\; Pashto
91	por	pt	Portuguese
93	que	qu	Quechua
94	roh	rm	Romansh
\N	run	rn	Rundi
95	ron	ro	Romanian
96	rus	ru	Russian
64	kin	rw	Kinyarwanda
99	san	sa	Sanskrit
\N	srd	sc	Sardinian
105	snd	sd	Sindhi
\N	sme	se	Northern Sami
98	sag	sg	Sango
106	sin	si	Sinhala\; Sinhalese
108	slk	sk	Slovak
109	slv	sl	Slovenian
97	smo	sm	Samoan
104	sna	sn	Shona
110	som	so	Somali
6	sqi	sq	Albanian
100	srp	sr	Serbian
\N	ssw	ss	Swati
\N	sot	st	Sotho, Southern
112	sun	su	Sundanese
114	swe	sv	Swedish
113	swa	sw	Swahili
117	tam	ta	Tamil
119	tel	te	Telugu
116	tgk	tg	Tajik
120	tha	th	Thai
122	tir	ti	Tigrinya
126	tuk	tk	Turkmen
115	tgl	tl	Tagalog
\N	tsn	tn	Tswana
123	ton	to	Tonga (Tonga Islands)
125	tur	tr	Turkish
124	tso	ts	Tsonga
118	tat	tt	Tatar
127	twi	tw	Twi
\N	tah	ty	Tahitian
128	uig	ug	Uighur\; Uyghur
129	ukr	uk	Ukrainian
130	urd	ur	Urdu
131	uzb	uz	Uzbek
160	ven	ve	Venda
132	vie	vi	Vietnamese
133	vol	vo	Volapak
\N	wln	wa	Walloon
135	wol	wo	Wolof
136	xho	xh	Xhosa
137	yid	yi	Yiddish
138	yor	yo	Yoruba
139	zha	za	Zhuang\; Chuang
25	zho	zh	Chinese
140	zul	zu	Zulu
\.

SELECT * FROM lang;
COMMIT;
