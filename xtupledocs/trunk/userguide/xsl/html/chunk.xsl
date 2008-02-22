<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
 <xsl:import href="http://docbook.sourceforge.net/release/xsl/current/html/chunk.xsl" />
 <xsl:include href="xtupletitlepages.xsl" />
 <xsl:include href="../common-options.xsl" />
 <xsl:param name="chunk.section.depth"  select="2" />
 <xsl:param name="chunk.first.sections" select="1" />
 <xsl:param name="chunk.separate.lots"  select="1" />
 <xsl:param name="chunker.output.indent" select="'yes'" />
 <xsl:param name="html.stylesheet">css/xtuple_html.css</xsl:param>
 <xsl:param name="html.stylesheet.type">text/css</xsl:param>
 <xsl:param name="para.propagates.style" select="1" />
 <xsl:param name="toc.max.depth"                select="3" />
 <xsl:param name="generate.section.toc.level"   select="2" />
 <xsl:param name="html.extra.head.links"        select="1" />

 <xsl:template match='section[@role = "openmfg"]' mode="class.value">
   <xsl:value-of select='"section-openmfg"'/>
 </xsl:template>

 <xsl:template match='variablelist[@role = "openmfg"]' mode="class.value">
   <xsl:value-of select='"variablelist-openmfg"'/>
 </xsl:template>

 <xsl:template match='varlistentry[@role = "openmfg"]' mode="class.value">
   <xsl:value-of select='"varlistentry-openmfg"'/>
 </xsl:template>

 <xsl:template match='screenshot[@role = "openmfg"]' mode="class.value">
   <xsl:value-of select='"screenshot-openmfg"'/>
 </xsl:template>

 <xsl:template match='section[@role = "standard"]' mode="class.value">
   <xsl:value-of select='"section-standard"'/>
 </xsl:template>

 <xsl:template match='variablelist[@role = "standard"]' mode="class.value">
   <xsl:value-of select='"variablelist-standard"'/>
 </xsl:template>

 <xsl:template match='varlistentry[@role = "standard"]' mode="class.value">
   <xsl:value-of select='"varlistentry-standard"'/>
 </xsl:template>

 <xsl:template match='screenshot[@role = "standard"]' mode="class.value">
   <xsl:value-of select='"screenshot-standard"'/>
 </xsl:template>

 <xsl:template match='section[@role = "postbooks"]' mode="class.value">
   <xsl:value-of select='"section-postbooks"'/>
 </xsl:template>

 <xsl:template match='variablelist[@role = "postbooks"]' mode="class.value">
   <xsl:value-of select='"variablelist-postbooks"'/>
 </xsl:template>

 <xsl:template match='varlistentry[@role = "postbooks"]' mode="class.value">
   <xsl:value-of select='"varlistentry-postbooks"'/>
 </xsl:template>

 <xsl:template match='screenshot[@role = "postbooks"]' mode="class.value">
   <xsl:value-of select='"screenshot-postbooks"'/>
 </xsl:template>

</xsl:stylesheet>
