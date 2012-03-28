<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output indent="yes"
              method="xml"
              version="1.0"
              encoding="utf-8"
              doctype-public="-//OASIS/DTD DocBook XML V4.5//EN"
              doctype-system="http://www.oasis-open.org/docbook/xml/4.5/docbookx.dtd"
  />

  <xsl:param name="ostofind"        />
  <xsl:param name="userleveltofind" />
  <xsl:param name="conditiontofind" />

  <!-- declare as global, set in template for root element -->
  <xsl:variable name="osname">
    <xsl:choose>
      <xsl:when test="$ostofind = 'linux'"  > Linux             </xsl:when>
      <xsl:when test="$ostofind = 'macosx'" > Mac OSX           </xsl:when>
      <xsl:when test="$ostofind = 'windows'"> Microsoft Windows </xsl:when>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="userlevelname">
    <xsl:choose>
      <xsl:when test="$userleveltofind = 'installfromsrc'">building components from source               </xsl:when>
      <xsl:when test="$userleveltofind = 'installfrompkg'">installing components from pre-built packages </xsl:when>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="userlevelnameabbrev">
    <xsl:choose>
      <xsl:when test="$userleveltofind = 'installfromsrc'">from source   </xsl:when>
      <xsl:when test="$userleveltofind = 'installfrompkg'">with packages </xsl:when>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="conditionname" >
    <xsl:choose>
      <xsl:when test="$conditiontofind = 'mingw'"> using MinGW                   </xsl:when>
      <xsl:when test="$conditiontofind = 'msvc'" > using Microsoft Visual Studio </xsl:when>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="conditionnameabbrev" >
    <xsl:choose>
      <xsl:when test="$conditiontofind = 'mingw'"> with MinGW </xsl:when>
      <xsl:when test="$conditiontofind = 'msvc'" > with MSVC  </xsl:when>
    </xsl:choose>
  </xsl:variable>

  <xsl:template match="node()|@*|processing-instruction()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="*[@condition or @userlevel or @os]">
    <xsl:if test="(@condition=$conditiontofind or not(@condition))
              and (@userlevel=$userleveltofind or not(@userlevel))
              and (@os=$ostofind               or not(@os))" >
      <xsl:copy>
        <xsl:apply-templates select="@*|node()" />
      </xsl:copy>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/chapter/title">
    <xsl:copy>
      <xsl:apply-templates select="@*" />
      Working on <xsl:value-of select="$osname"/>
      <xsl:value-of select="$conditionname"/>
      <xsl:value-of select="$userlevelname"/>
    </xsl:copy>
    <titleabbrev>
      <xsl:value-of select="$osname"/>
      <xsl:value-of select="$conditionnameabbrev"/>
      <xsl:value-of select="$userlevelnameabbrev"/>
    </titleabbrev>
  </xsl:template>

</xsl:stylesheet>
