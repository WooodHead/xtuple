<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output indent="yes"
              method="xml"
              version="1.0"
              encoding="utf-8"
              doctype-public="-//OASIS/DTD DocBook XML V4.5//EN"
              doctype-system="http://www.oasis-open.org/docbook/xml/4.5/docbookx.dtd"
  />

  <xsl:param name="ostofind"        select = "'all'" />
  <xsl:param name="userleveltofind" select = "'all'" />
  <xsl:param name="conditiontofind" select = "'all'" />

  <xsl:template match="node()|@*|processing-instruction()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- tried combining logic but xsltproc wouldn't compile the boolean expressions! -->

  <xsl:template match="*[@condition]">
    <xsl:choose>
      <xsl:when test="@condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[@userlevel]">
    <xsl:choose>
      <xsl:when test="@userlevel = $userleveltofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$userleveltofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[@os]">
    <xsl:choose>
      <xsl:when test="@os = $ostofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[@condition and @userlevel]">
    <xsl:choose>
      <xsl:when test="@condition = $conditiontofind and @userlevel = $userleveltofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@condition = $conditiontofind and $userleveltofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$conditiontofind = 'all' and @userlevel = $userleveltofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$conditiontofind = 'all' and $userleveltofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[@os and @condition]">
    <xsl:choose>
      <xsl:when test="@os = $ostofind and @condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@os = $ostofind and $conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and @condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and $conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[@os and @userlevel]">
    <xsl:choose>
      <xsl:when test="@os = $ostofind and @userlevel = $userleveltofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@os = $ostofind and $userleveltofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and @userlevel = $userleveltofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and $userleveltofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="*[@os and @userlevel and @condition]">
    <xsl:choose>
      <xsl:when test="@os = $ostofind and @userlevel = $userleveltofind and @condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@os = $ostofind and @userlevel = $userleveltofind and $conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@os = $ostofind and $userleveltofind = 'all' and @condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="@os = $ostofind and $userleveltofind = 'all' and $conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and @userlevel = $userleveltofind and @condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and @userlevel = $userleveltofind and $conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and $userleveltofind = 'all' and @condition = $conditiontofind">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
      <xsl:when test="$ostofind = 'all' and $userleveltofind = 'all' and $conditiontofind = 'all'">
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="articleinfo/title">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
    <subjectset>
      <subject name="os">
        <subjectterm><xsl:value-of select="$ostofind"/></subjectterm>
      </subject>
      <subject name="userlevel">
        <subjectterm><xsl:value-of select="$userleveltofind"/></subjectterm>
      </subject>
      <subject name="conditions">
        <subjectterm><xsl:value-of select="$conditiontofind"/></subjectterm>
      </subject>
    </subjectset>
  </xsl:template>

</xsl:stylesheet>
