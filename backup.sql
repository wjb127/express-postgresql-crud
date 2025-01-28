--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: active_status_enum; Type: TYPE; Schema: public; Owner: my_user
--

CREATE TYPE public.active_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.active_status_enum OWNER TO my_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app; Type: TABLE; Schema: public; Owner: my_user
--

CREATE TABLE public.app (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    package_name character varying(255) NOT NULL,
    ads_status json DEFAULT '{}'::json NOT NULL,
    app_style_id bigint,
    app_toolbar_id bigint,
    active_status public.active_status_enum DEFAULT 'ACTIVE'::public.active_status_enum
);


ALTER TABLE public.app OWNER TO my_user;

--
-- Name: app_fcm_topic; Type: TABLE; Schema: public; Owner: my_user
--

CREATE TABLE public.app_fcm_topic (
    id bigint NOT NULL,
    app_id bigint,
    title character varying(255),
    fcm_topic character varying(255),
    type character varying(50),
    translation_title_json json DEFAULT '{}'::json NOT NULL,
    "position" integer
);


ALTER TABLE public.app_fcm_topic OWNER TO my_user;

--
-- Name: app_fcm_topic_id_seq; Type: SEQUENCE; Schema: public; Owner: my_user
--

CREATE SEQUENCE public.app_fcm_topic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_fcm_topic_id_seq OWNER TO my_user;

--
-- Name: app_fcm_topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: my_user
--

ALTER SEQUENCE public.app_fcm_topic_id_seq OWNED BY public.app_fcm_topic.id;


--
-- Name: app_id_seq; Type: SEQUENCE; Schema: public; Owner: my_user
--

CREATE SEQUENCE public.app_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_id_seq OWNER TO my_user;

--
-- Name: app_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: my_user
--

ALTER SEQUENCE public.app_id_seq OWNED BY public.app.id;


--
-- Name: app_style; Type: TABLE; Schema: public; Owner: my_user
--

CREATE TABLE public.app_style (
    id bigint NOT NULL,
    app_style_menu character varying(255),
    toolbar_color character varying(50),
    indicator_color character varying(50),
    button_color character varying(50),
    button_text_color character varying(50),
    active_status public.active_status_enum DEFAULT 'ACTIVE'::public.active_status_enum
);


ALTER TABLE public.app_style OWNER TO my_user;

--
-- Name: app_style_id_seq; Type: SEQUENCE; Schema: public; Owner: my_user
--

CREATE SEQUENCE public.app_style_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_style_id_seq OWNER TO my_user;

--
-- Name: app_style_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: my_user
--

ALTER SEQUENCE public.app_style_id_seq OWNED BY public.app_style.id;


--
-- Name: app_toolbar; Type: TABLE; Schema: public; Owner: my_user
--

CREATE TABLE public.app_toolbar (
    id bigint NOT NULL,
    toolbar_items json DEFAULT '{}'::json NOT NULL,
    active_status public.active_status_enum DEFAULT 'ACTIVE'::public.active_status_enum
);


ALTER TABLE public.app_toolbar OWNER TO my_user;

--
-- Name: app_toolbar_id_seq; Type: SEQUENCE; Schema: public; Owner: my_user
--

CREATE SEQUENCE public.app_toolbar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_toolbar_id_seq OWNER TO my_user;

--
-- Name: app_toolbar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: my_user
--

ALTER SEQUENCE public.app_toolbar_id_seq OWNED BY public.app_toolbar.id;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: my_user
--

CREATE TABLE public.menu (
    id bigint NOT NULL,
    app_id bigint,
    title character varying(255),
    description character varying(255),
    "position" integer,
    category character varying(255),
    keyword character varying(255),
    ui_type character varying(255),
    active_status public.active_status_enum DEFAULT 'ACTIVE'::public.active_status_enum
);


ALTER TABLE public.menu OWNER TO my_user;

--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: my_user
--

CREATE SEQUENCE public.menu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_id_seq OWNER TO my_user;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: my_user
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: app id; Type: DEFAULT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app ALTER COLUMN id SET DEFAULT nextval('public.app_id_seq'::regclass);


--
-- Name: app_fcm_topic id; Type: DEFAULT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_fcm_topic ALTER COLUMN id SET DEFAULT nextval('public.app_fcm_topic_id_seq'::regclass);


--
-- Name: app_style id; Type: DEFAULT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_style ALTER COLUMN id SET DEFAULT nextval('public.app_style_id_seq'::regclass);


--
-- Name: app_toolbar id; Type: DEFAULT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_toolbar ALTER COLUMN id SET DEFAULT nextval('public.app_toolbar_id_seq'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Data for Name: app; Type: TABLE DATA; Schema: public; Owner: my_user
--

COPY public.app (id, name, package_name, ads_status, app_style_id, app_toolbar_id, active_status) FROM stdin;
2	Sample App	com.sample.app	{"enabled":true}	1	1	ACTIVE
3	Productivity App	com.productivity.app	{"enabled":true}	1	1	ACTIVE
\.


--
-- Data for Name: app_fcm_topic; Type: TABLE DATA; Schema: public; Owner: my_user
--

COPY public.app_fcm_topic (id, app_id, title, fcm_topic, type, translation_title_json, "position") FROM stdin;
3	2	Topic 1	topic_1	general	{"en":"Topic 1","kr":"토픽 1"}	1
4	3	News Notifications	news_updates	general	{"en":"News Updates","kr":"뉴스 업데이트"}	1
\.


--
-- Data for Name: app_style; Type: TABLE DATA; Schema: public; Owner: my_user
--

COPY public.app_style (id, app_style_menu, toolbar_color, indicator_color, button_color, button_text_color, active_status) FROM stdin;
1	Default Style	#FFFFFF	#000000	#007BFF	#FFFFFF	ACTIVE
2	Light Theme	#FFFFFF	#000000	#4CAF50	#FFFFFF	ACTIVE
\.


--
-- Data for Name: app_toolbar; Type: TABLE DATA; Schema: public; Owner: my_user
--

COPY public.app_toolbar (id, toolbar_items, active_status) FROM stdin;
1	{"home":"Home","settings":"Settings"}	ACTIVE
2	{"home":"Home","profile":"Profile","settings":"Settings"}	ACTIVE
3	{"home":"Home","profile":"Profile","settings":"Settings"}	ACTIVE
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: my_user
--

COPY public.menu (id, app_id, title, description, "position", category, keyword, ui_type, active_status) FROM stdin;
2	2	Main Menu	This is the main menu	1	General	menu	default	ACTIVE
4	3	Dashboard	Main dashboard menu	1	Navigation	dashboard	grid	ACTIVE
\.


--
-- Name: app_fcm_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: my_user
--

SELECT pg_catalog.setval('public.app_fcm_topic_id_seq', 4, true);


--
-- Name: app_id_seq; Type: SEQUENCE SET; Schema: public; Owner: my_user
--

SELECT pg_catalog.setval('public.app_id_seq', 3, true);


--
-- Name: app_style_id_seq; Type: SEQUENCE SET; Schema: public; Owner: my_user
--

SELECT pg_catalog.setval('public.app_style_id_seq', 2, true);


--
-- Name: app_toolbar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: my_user
--

SELECT pg_catalog.setval('public.app_toolbar_id_seq', 3, true);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: my_user
--

SELECT pg_catalog.setval('public.menu_id_seq', 4, true);


--
-- Name: app_fcm_topic app_fcm_topic_pkey; Type: CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_fcm_topic
    ADD CONSTRAINT app_fcm_topic_pkey PRIMARY KEY (id);


--
-- Name: app app_pkey; Type: CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app
    ADD CONSTRAINT app_pkey PRIMARY KEY (id);


--
-- Name: app_style app_style_pkey; Type: CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_style
    ADD CONSTRAINT app_style_pkey PRIMARY KEY (id);


--
-- Name: app_toolbar app_toolbar_pkey; Type: CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_toolbar
    ADD CONSTRAINT app_toolbar_pkey PRIMARY KEY (id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: app app_app_style_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app
    ADD CONSTRAINT app_app_style_id_fkey FOREIGN KEY (app_style_id) REFERENCES public.app_style(id);


--
-- Name: app app_app_toolbar_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app
    ADD CONSTRAINT app_app_toolbar_id_fkey FOREIGN KEY (app_toolbar_id) REFERENCES public.app_toolbar(id);


--
-- Name: app_fcm_topic app_fcm_topic_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.app_fcm_topic
    ADD CONSTRAINT app_fcm_topic_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.app(id);


--
-- Name: menu menu_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: my_user
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.app(id);


--
-- PostgreSQL database dump complete
--

