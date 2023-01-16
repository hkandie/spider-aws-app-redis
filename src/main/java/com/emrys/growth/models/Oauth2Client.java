package com.emrys.growth.models;

import lombok.Data;

import java.util.List;

public record Oauth2Client(
    String clientId,
    String clientSecret,
    List<String> redirectUri,
    List<String> scopes
) {
}
